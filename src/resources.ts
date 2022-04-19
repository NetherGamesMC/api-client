import type {NetherGamesClient} from './client.js';
import {NetherGamesValidationError} from './errors.js';
import type {
  Announcement,
  AnnouncementBoard,
  AnnouncementDiscord,
  AnnouncementMessage,
  AnnouncementQuery,
  AnnouncementTitle,
  Faction,
  Guild,
  GuildDefault,
  GuildExpanded,
  GuildQuery,
  Leaderboard,
  LeaderboardCredits,
  LeaderboardFactions,
  LeaderboardGame,
  LeaderboardGuilds,
  LeaderboardKDR,
  LeaderboardKills,
  LeaderboardParkour,
  LeaderboardQuery,
  LeaderboardVoters,
  LeaderboardWins,
  LeaderboardXP,
  Player,
  PlayerLeaderboard,
  PlayerQuery,
  PlayerSkin,
  SearchFullTextQuery,
  SearchFullTextResponse,
  SearchResponse,
  ServerMeta,
  ServerPing,
  Servers,
  ServiceStatus,
  Stream,
} from './types.js';

export class NetherGamesResource {
  constructor(readonly _client: NetherGamesClient) {}
}

export class AnnouncementsResource extends NetherGamesResource {
  async list(type: 'board', limit?: number): Promise<AnnouncementBoard[]>;
  async list(type: 'message', limit?: number): Promise<AnnouncementMessage[]>;
  async list(type: 'title', limit?: number): Promise<AnnouncementTitle[]>;
  async list(type: 'discord', limit?: number): Promise<AnnouncementDiscord[]>;
  async list(type: AnnouncementQuery['type'], limit = 100): Promise<Announcement[]> {
    return this._client._getMany<Announcement>('/v1/announcements', {type, limit});
  }
}

export class FactionsResource extends NetherGamesResource {
  async retrieve(faction: string): Promise<Faction | null> {
    return this._client._getOne<Faction>(`/v1/factions/${faction}`);
  }

  async search(factions: string[], params?: GuildQuery): Promise<Faction[]> {
    return this._client._getBulk<Faction>('factions', factions, params);
  }
}

type GuildReturn<T extends GuildQuery> = T['expand'] extends true ? GuildExpanded : GuildDefault;

export class GuildsResource extends NetherGamesResource {
  async retrieve<T extends GuildQuery>(guild: string, params?: GuildQuery): Promise<GuildReturn<T> | null> {
    return this._client._getOne<GuildReturn<T>>(`/v1/guilds/${guild}`, params);
  }

  async search(guilds: string[], params?: GuildQuery): Promise<Guild[]> {
    return this._client._getBulk<Guild>('guilds', guilds, params);
  }
}

const LEADERBOARD_MAPPINGS = {
  bh: ['wins'],
  bw: [
    'doubles_final_kills',
    'doubles_kills',
    'doubles_wins',
    'final_kills',
    'kills',
    'solo_final_kills',
    'solo_kills',
    'solo_wins',
    'squads_final_kills',
    'squads_kills',
    'squads_wins',
    'trios_final_kills',
    'trios_kills',
    'trios_wins',
    'wins',
  ],
  cq: ['flags_captured', 'kills', 'wins'],
  duels: ['kills', 'wins'],
  mm: [
    'bow_kills',
    'classic_kills',
    'classic_wins',
    'infection_kills',
    'infection_wins',
    'kills',
    'knife_kills',
    'throw_knife_kills',
    'wins',
  ],
  ms: ['wins'],
  sc: ['wins'],
  sg: ['kills', 'wins'],
  sw: [
    'doubles_insane_kills',
    'doubles_kills',
    'doubles_normal_kills',
    'doubles_wins',
    'kills',
    'solo_insane_kills',
    'solo_kills',
    'solo_normal_kills',
    'solo_wins',
    'wins',
  ],
  tb: ['kills', 'wins'],
} as const;

type LeaderboardMappings = typeof LEADERBOARD_MAPPINGS;
type LeaderboardKey = keyof LeaderboardMappings;

interface LeaderboardQueryColumn<T extends LeaderboardKey> {
  game: LeaderboardKey;
  type: LeaderboardMappings[T][number];
}

interface LeaderboardParams<T extends LeaderboardKey> {
  limit?: number;
  column?: LeaderboardQuery['column'] | LeaderboardQueryColumn<T>;
  scope?: LeaderboardQuery['scope'];
}

export class LeaderboardResource extends NetherGamesResource {
  async list<T extends LeaderboardKey>(type: 'credits', params?: LeaderboardParams<T>): Promise<LeaderboardCredits[]>;
  async list<T extends LeaderboardKey>(type: 'factions', params?: LeaderboardParams<T>): Promise<LeaderboardFactions[]>;
  async list<T extends LeaderboardKey>(type: 'game', params?: LeaderboardParams<T>): Promise<LeaderboardGame[]>;
  async list<T extends LeaderboardKey>(type: 'guilds', params?: LeaderboardParams<T>): Promise<LeaderboardGuilds[]>;
  async list<T extends LeaderboardKey>(type: 'kdr', params?: LeaderboardParams<T>): Promise<LeaderboardKDR[]>;
  async list<T extends LeaderboardKey>(type: 'kills', params?: LeaderboardParams<T>): Promise<LeaderboardKills[]>;
  async list<T extends LeaderboardKey>(type: 'parkour', params?: LeaderboardParams<T>): Promise<LeaderboardParkour[]>;
  async list<T extends LeaderboardKey>(type: 'voters', params?: LeaderboardParams<T>): Promise<LeaderboardVoters[]>;
  async list<T extends LeaderboardKey>(type: 'wins', params?: LeaderboardParams<T>): Promise<LeaderboardWins[]>;
  async list<T extends LeaderboardKey>(type: 'xp', params?: LeaderboardParams<T>): Promise<LeaderboardXP[]>;
  async list<T extends LeaderboardKey>(
    type: LeaderboardQuery['type'],
    params?: LeaderboardParams<T>,
  ): Promise<Leaderboard[]> {
    let column = params?.column;
    if (column != null && typeof column !== 'string') {
      const options = LEADERBOARD_MAPPINGS[column.game];
      if (!options.includes(column.type as any)) {
        throw new NetherGamesValidationError(column.game, column.type, [...options]);
      }
      column = `${column.game}_${column.type}` as LeaderboardQuery['column'];
    }
    return this._client._getMany<Leaderboard>('/v1/leaderboard', {...params, type, column});
  }

  async bulk(queries: LeaderboardQuery[]): Promise<Leaderboard[]> {
    return this._client._makeRequest<Leaderboard[]>({path: '/v1/leaderboard/bulk', method: 'POST', body: queries});
  }
}

interface PlayerParams {
  include?: Array<'faction' | 'punishments' | 'stats' | 'voteStatus' | 'warnings'>;
}

export class PlayersResource extends NetherGamesResource {
  async retrieve(player: string, params: PlayerParams = {}): Promise<Player | null> {
    return this._client._getOne<Player>(`/v1/players/${player}`, this.#getQuery(params));
  }

  #getQuery(params: PlayerParams): Record<string, any> {
    if (params.include == null) {
      return {};
    }
    return {
      withStats: params.include.includes('stats'),
      withVoteStatus: params.include.includes('voteStatus'),
      withFactionData: params.include.includes('faction'),
      withPunishments: params.include.includes('punishments'),
      withWarnings: params.include.includes('warnings'),
    };
  }

  async search(players: string[], params?: PlayerQuery): Promise<Player[]> {
    return this._client._getBulk<Player>('players', players, params);
  }

  async leaderboard(player: string): Promise<PlayerLeaderboard | null> {
    return this._client._getOne<PlayerLeaderboard>(`/v1/players/${player}/leaderboard`);
  }

  async leaderboardBulk(names: string[]): Promise<PlayerLeaderboard[]> {
    return this._client._makeRequest<PlayerLeaderboard[]>({
      path: '/v1/players/leaderboard/bulk',
      method: 'POST',
      body: {names},
    });
  }

  async avatar(player: string): Promise<PlayerSkin> {
    const skin = await this._client._getOne<PlayerSkin>(`/v1/players/${player}/avatar`, {dataOnly: true}, true);
    return skin!;
  }

  async skin(player: string): Promise<PlayerSkin> {
    const skin = await this._client._getOne<PlayerSkin>(`/v1/players/${player}/skin`, {dataOnly: true}, true);
    return skin!;
  }

  /**
   * @deprecated Use `PlayersResource.xuidMapping` instead.
   */
  async usernamesByXuids(xuids: string[]): Promise<Record<string, string>> {
    return this._client._makeRequest<Record<string, string>>({
      path: '/v1/players/xuids',
      method: 'POST',
      body: {xuids},
    });
  }

  async xuidMapping(values: string[]): Promise<Record<string, string>> {
    return this._client._makeRequest<Record<string, string>>({
      path: '/v1/players/xuids',
      method: 'POST',
      body: values,
    });
  }
}

export class SearchResource extends NetherGamesResource {
  async simple(name: string): Promise<SearchResponse[]> {
    return this._client._getMany<SearchResponse>('/v1/search', {name});
  }

  async fulltext(
    query: string,
    params?: Pick<SearchFullTextQuery, 'limit' | 'type'>,
  ): Promise<SearchFullTextResponse[]> {
    return this._client._getMany<SearchFullTextResponse>('/v1/search-full', {query, ...params});
  }
}

export class ServersResource extends NetherGamesResource {
  async retrieve(): Promise<Servers> {
    const data = await this._client._getOne<Servers>('/v1/servers');
    return data!;
  }

  async meta(): Promise<ServerMeta> {
    const data = await this._client._getOne<ServerMeta>('/v1/servers/meta');
    this._client.lastServerMeta = data!;
    return data!;
  }

  async ping(ip = 'play.nethergames.org', port = 19_132): Promise<ServerPing | null> {
    return this._client._getOne<ServerPing>('/v1/servers/ping', {ip, port});
  }
}

export class StatusResource extends NetherGamesResource {
  async retrieve(): Promise<ServiceStatus> {
    const data = await this._client._getOne<ServiceStatus>('/v1/status');
    return data!;
  }
}

export class StreamResource extends NetherGamesResource {
  async retrieve(): Promise<Stream> {
    const data = await this._client._getOne<Stream>('/v1/stream');
    return data!;
  }
}
