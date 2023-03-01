import {CacheManager} from './cache.js'
import {
  AnnouncementManager,
  FactionManager,
  GuildManager,
  LeaderboardManager,
  PlayerManager,
  SearchManager,
  ServerManager,
  StreamManager,
} from './managers.js'
import type {RateLimitHeaders} from './utils.js'

type NetherGamesClientOptions = {
  baseUrl?: string
  userAgent?: string
  userAgentAppendix?: string
  cache?: CacheManager
}

export class NetherGamesClient {
  public readonly token: string | undefined
  public readonly baseUrl: string
  public readonly userAgent: string

  public readonly cache: CacheManager
  public readonly announcements: AnnouncementManager
  public readonly factions: FactionManager
  public readonly guilds: GuildManager
  public readonly leaderboard: LeaderboardManager
  public readonly players: PlayerManager
  public readonly search: SearchManager
  public readonly servers: ServerManager
  public readonly stream: StreamManager

  public lastBuildId: string | null
  public lastRateLimit: RateLimitHeaders | null

  public constructor(token?: string, options: NetherGamesClientOptions = {}) {
    this.token = token
    this.baseUrl = options.baseUrl ?? 'https://api.ngmc.co'
    this.userAgent = options.userAgent ?? 'NetherGames-API-Client/3.0.0'

    if (options.userAgentAppendix) {
      this.userAgent += ` (${options.userAgentAppendix})`
    }

    this.lastBuildId = null
    this.lastRateLimit = null

    this.cache = options.cache ?? new CacheManager()
    this.announcements = new AnnouncementManager(this)
    this.factions = new FactionManager(this)
    this.guilds = new GuildManager(this)
    this.leaderboard = new LeaderboardManager(this)
    this.players = new PlayerManager(this)
    this.search = new SearchManager(this)
    this.servers = new ServerManager(this)
    this.stream = new StreamManager(this)
  }
}
