import {createNanoEvents, Emitter, Unsubscribe} from 'nanoevents';
import fetch from 'node-fetch';
import QuickLRU from 'quick-lru';
import {NetherGamesError, NetherGamesRateLimitError, NetherGamesRequestError} from './errors.js';
import {
  AnnouncementsResource,
  FactionsResource,
  GuildsResource,
  LeaderboardResource,
  PlayersResource,
  SearchResource,
  ServersResource,
  StatusResource,
  StreamResource,
} from './resources.js';
import type {Faction, Guild, Player, ServerMeta} from './types.js';
import {parseCacheHeaders, parseRateLimitHeaders, RateLimitHeaders} from './utils.js';

interface MakeRequestOptions {
  path: string;
  method: 'GET' | 'POST';
  body?: Record<string, any>;
  params?: Record<string, any>;
  rateLimitExempt?: boolean;
}

interface NetherGamesClientOptions {
  baseUrl?: string;
  cacheMaxSize?: number;
  userAgent?: string;
  userAgentAppendix?: string;
}

interface Events {
  error: (request: Request, response: Response, error: NetherGamesError, timestamp: Date) => void;
  request: (request: Request, timestamp: Date) => void;
  response: (request: Request, response: Response, timestamp: Date, latencyMillis: number) => void;
}

export class NetherGamesClient {
  readonly #apiKey: string | undefined;
  readonly #baseUrl: string;
  readonly #cache: QuickLRU<string, Record<string, any>>;
  readonly #emitter: Emitter;
  readonly #userAgent: string;

  readonly announcements: AnnouncementsResource;
  readonly factions: FactionsResource;
  readonly guilds: GuildsResource;
  readonly leaderboard: LeaderboardResource;
  readonly players: PlayersResource;
  readonly search: SearchResource;
  readonly servers: ServersResource;
  readonly status: StatusResource;
  readonly stream: StreamResource;

  lastBuildId: string | null;
  lastRateLimit: RateLimitHeaders | null;
  lastServerMeta: ServerMeta | null;

  constructor(apiKey?: string, options: NetherGamesClientOptions = {}) {
    this.#apiKey = apiKey;
    this.#baseUrl = options.baseUrl ?? 'https://api.ngmc.co';
    this.#cache = new QuickLRU({maxSize: options.cacheMaxSize ?? 1000});
    this.#userAgent = options.userAgent ?? 'NetherGames-API-Client/2.0.14';
    this.#emitter = createNanoEvents<Events>();
    if (options.userAgentAppendix != null) {
      this.#userAgent += ` (${options.userAgentAppendix})`;
    }
    this.lastBuildId = null;
    this.lastRateLimit = null;
    this.lastServerMeta = null;

    this.announcements = new AnnouncementsResource(this);
    this.factions = new FactionsResource(this);
    this.guilds = new GuildsResource(this);
    this.leaderboard = new LeaderboardResource(this);
    this.players = new PlayersResource(this);
    this.search = new SearchResource(this);
    this.servers = new ServersResource(this);
    this.status = new StatusResource(this);
    this.stream = new StreamResource(this);
  }

  on<E extends keyof Events>(event: E, callback: Events[E]): Unsubscribe {
    return this.#emitter.on(event, callback);
  }

  async _makeRequest<T>(options: MakeRequestOptions): Promise<T> {
    const url = new URL(options.path, this.#baseUrl);
    for (const [key, value] of Object.entries(options.params ?? {})) {
      if (value != null) {
        url.searchParams.set(key, value.toString());
      }
    }

    const body = options.body != null ? JSON.stringify(options.body) : undefined;
    const cacheKey = url.toString() + (body ?? '');
    const cached = this.#cache.get(cacheKey);
    if (cached != null) {
      return cached as T;
    }

    const start = new Date();
    this.#emitter.emit('request', url.toString(), start);

    const response = await fetch(url.toString(), {
      method: options.method,
      headers: {
        ...(this.#apiKey != null ? {Authorization: this.#apiKey} : {}),
        'Content-Type': 'application/json',
        'User-Agent': this.#userAgent,
      },
      body,
    });

    const end = new Date();
    this.#emitter.emit('response', url.toString(), end, end.getTime() - start.getTime());

    if (!options.rateLimitExempt) {
      this.lastRateLimit = parseRateLimitHeaders(response.headers);
    }
    this.lastBuildId = response.headers.get('X-Build-Id');

    const contentType = response.headers.get('Content-Type');
    if (!contentType?.includes('application/json')) {
      const message = await response.text();
      const error = new NetherGamesRequestError({code: 0, message, status: response.status});
      this.#emitter.emit('error', url.toString(), response, error, end);
      throw error;
    }

    const data = (await response.json()) as Record<string, any>;
    if (response.ok) {
      const {remaining} = parseCacheHeaders(response.headers);
      this.#cache.set(cacheKey + (body ?? ''), data, {maxAge: remaining});
      return data as T;
    }

    if (!options.rateLimitExempt && response.status === 429) {
      const error = new NetherGamesRateLimitError(data['message'], this.lastRateLimit!);
      this.#emitter.emit('error', url.toString(), response, error, end);
      throw error;
    }

    const error = new NetherGamesRequestError({
      code: data['code'],
      message: data['message'],
      status: response.status,
      errors: data['errors'],
    });
    this.#emitter.emit('error', url.toString(), response, error, end);
    throw error;
  }

  async _getOne<T>(path: string, params?: Record<string, any>, rateLimitExempt?: boolean): Promise<T | null> {
    try {
      const result = await this._makeRequest<T>({path, method: 'GET', params, rateLimitExempt});
      return result;
    } catch (error) {
      if (error instanceof NetherGamesRequestError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async _getMany<T>(path: string, params?: Record<string, any>): Promise<T[]> {
    return this._makeRequest<T[]>({path, method: 'GET', params});
  }

  async _getBulk<T extends Player | Guild | Faction>(
    resource: 'players' | 'guilds' | 'factions',
    names: string[],
    params?: Record<string, any>,
  ): Promise<T[]> {
    const uniqueNames = new Set(names);
    const results: T[] = [];

    for (const name of uniqueNames) {
      const url = new URL(`/v1/${resource}/${name}`, this.#baseUrl);
      for (const [key, value] of Object.entries(params ?? {})) {
        if (value != null) {
          url.searchParams.set(key, value.toString());
        }
      }

      const cacheKey = url.toString();
      const cached = this.#cache.get(cacheKey.toString());
      if (cached != null) {
        uniqueNames.delete(name);
        results.push(cached as T);
      }
    }

    if (uniqueNames.size > 0) {
      const remaining = await this._makeRequest<T[]>({
        path: `/v1/${resource}/batch`,
        method: 'POST',
        body: {names: [...uniqueNames], ...params},
      });
      results.push(...remaining);
    }

    return results;
  }
}
