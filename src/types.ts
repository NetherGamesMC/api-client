import type {components} from './openapi.js'

export type Announcement = AnnouncementBoard | AnnouncementDiscord | AnnouncementMessage | AnnouncementTitle
export type AnnouncementBoard = components['schemas']['AnnouncementsResponseBoard']
export type AnnouncementDiscord = components['schemas']['AnnouncementsResponseDiscord']
export type AnnouncementMessage = components['schemas']['AnnouncementsResponseMessage']
export type AnnouncementTitle = components['schemas']['AnnouncementsResponseTitle']
export type AnnouncementQuery = components['schemas']['AnnouncementsQuery']

interface ExpandedMembers {
  leader: Player
  officers: Player[]
  members: Player[]
}

export type Faction = FactionDefault | FactionExpanded
export type FactionDefault = components['schemas']['FactionResponse']
export type FactionExpanded = Omit<FactionDefault, 'leader' | 'officers' | 'members'> & ExpandedMembers

export type Guild = GuildDefault | GuildExpanded
export type GuildDefault = components['schemas']['GuildResponse']
export type GuildExpanded = Omit<GuildDefault, 'leader' | 'officers' | 'members'> & ExpandedMembers
export type GuildQuery = components['schemas']['GuildQuery']

export type LeaderboardCrateKeys = components['schemas']['LeaderboardResponseCrateKeys']
export type LeaderboardCredits = components['schemas']['LeaderboardResponseCredits']
export type LeaderboardFactions = components['schemas']['LeaderboardResponseFactions']
export type LeaderboardGame = components['schemas']['LeaderboardResponseGame']
export type LeaderboardGuilds = components['schemas']['LeaderboardResponseGuilds']
export type LeaderboardKDR = components['schemas']['LeaderboardResponseKDR']
export type LeaderboardKills = components['schemas']['LeaderboardResponseKills']
export type LeaderboardOldest = components['schemas']['LeaderboardResponseOldest']
export type LeaderboardParkour = components['schemas']['LeaderboardResponseParkour']
export type LeaderboardPlaytime = components['schemas']['LeaderboardResponsePlaytime']
export type LeaderboardVoters = components['schemas']['LeaderboardResponseVoters']
export type LeaderboardWins = components['schemas']['LeaderboardResponseWins']
export type LeaderboardWLR = components['schemas']['LeaderboardResponseWLR']
export type LeaderboardXP = components['schemas']['LeaderboardResponseXP']
export type Leaderboard =
  | LeaderboardCrateKeys
  | LeaderboardCredits
  | LeaderboardFactions
  | LeaderboardGame
  | LeaderboardGuilds
  | LeaderboardKDR
  | LeaderboardKills
  | LeaderboardOldest
  | LeaderboardParkour
  | LeaderboardPlaytime
  | LeaderboardVoters
  | LeaderboardWins
  | LeaderboardWLR
  | LeaderboardXP
export type LeaderboardQuery = components['schemas']['LeaderboardQuery']

export type Player = components['schemas']['PlayerResponse']
export type PlayerLeaderboard = components['schemas']['PlayerLeaderboardResponse']
export type PlayerLeaderboardQuery = components['schemas']['PlayerLeaderboardQuery']
export type PlayerQuery = components['schemas']['PlayerQuery']
export type PlayerSkin = components['schemas']['PlayerSkinResponseData']
export type PlayerStats = components['schemas']['PlayerStatsResponse']
export type PlayerStatsByTypeResponse = components['schemas']['PlayerStatsByTypeResponse']
export type PlayerStatsQuery = components['schemas']['PlayerStatsQuery']
export type PlayerPunishment = components['schemas']['PlayerPunishmentResponse']

export type SearchResponse = components['schemas']['SearchResponse']
export type SearchFullTextResponse = components['schemas']['SearchFullTextResponse']
export type SearchFullTextQuery = components['schemas']['SearchFullTextQuery']

export type ServerMeta = components['schemas']['ServerMetaResponse']
export type ServerPing = components['schemas']['ServerPingResponse']
export type Servers = components['schemas']['ServerResponse']

export type Stream = components['schemas']['StreamResponse']

export type Update = components['schemas']['UpdateResponse']
export type UpdateQuery = components['schemas']['UpdatesQuery']

interface RelayPaginationResponse<T extends Player | Guild | Faction> {
  readonly nodes: readonly T[]
  readonly edges: readonly {
    readonly cursor: string
    readonly node?: T
  }[]
  readonly pageInfo: {
    readonly hasNextPage: boolean
    readonly hasPreviousPage: boolean
    readonly startCursor?: string
    readonly endCursor?: string
  }
  readonly totalCount: number
}

export type RelayPaginationPlayer = RelayPaginationResponse<Player>
export type RelayPaginationGuild = RelayPaginationResponse<Guild>
export type RelayPaginationFaction = RelayPaginationResponse<Faction>

export type RelayPaginationQueryPlayer = components['schemas']['RelayPaginationQueryPlayer']
export type RelayPaginationQueryGuild = components['schemas']['RelayPaginationQueryGuild']
export type RelayPaginationQueryFaction = components['schemas']['RelayPaginationQueryFaction']
