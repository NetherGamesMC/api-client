import type {components} from './openapi.js';

export type Announcement = AnnouncementTitle | AnnouncementMessage | AnnouncementBoard;
export type AnnouncementBoard = components['schemas']['AnnouncementsResponseBoard'];
export type AnnouncementMessage = components['schemas']['AnnouncementsResponseMessage'];
export type AnnouncementQuery = components['schemas']['AnnouncementsQuery'];
export type AnnouncementTitle = components['schemas']['AnnouncementsResponseTitle'];

export type Faction = components['schemas']['FactionResponse'];

export type Guild = GuildDefault | GuildExpanded;
export type GuildDefault = components['schemas']['GuildResponseDefault'];
export type GuildExpanded = components['schemas']['GuildResponseExpanded'];
export type GuildQuery = components['schemas']['GuildQuery'];

export type LeaderboardCredits = components['schemas']['LeaderboardResponseCredits'];
export type LeaderboardFactions = components['schemas']['LeaderboardResponseFactions'];
export type LeaderboardGame = components['schemas']['LeaderboardResponseGame'];
export type LeaderboardGuilds = components['schemas']['LeaderboardResponseGuilds'];
export type LeaderboardKDR = components['schemas']['LeaderboardResponseKDR'];
export type LeaderboardKills = components['schemas']['LeaderboardResponseKills'];
export type LeaderboardParkour = components['schemas']['LeaderboardResponseParkour'];
export type LeaderboardVoters = components['schemas']['LeaderboardResponseVoters'];
export type LeaderboardWins = components['schemas']['LeaderboardResponseWins'];
export type LeaderboardXP = components['schemas']['LeaderboardResponseXP'];
export type Leaderboard =
  | LeaderboardCredits
  | LeaderboardFactions
  | LeaderboardGame
  | LeaderboardGuilds
  | LeaderboardKDR
  | LeaderboardKills
  | LeaderboardParkour
  | LeaderboardVoters
  | LeaderboardWins
  | LeaderboardXP;
export type LeaderboardQuery = components['schemas']['LeaderboardQuery'];

export type Player = components['schemas']['PlayerResponse'];
export type PlayerLeaderboard = components['schemas']['PlayerLeaderboardResponse'];
export type PlayerQuery = components['schemas']['PlayerQuery'];
export type PlayerSkin = components['schemas']['PlayerSkinResponseData'];

export type SearchResponse = components['schemas']['SearchResponse'];

export type ServerMeta = components['schemas']['ServerMetaResponse'];
export type ServerPing = components['schemas']['ServerPingResponse'];
export type Servers = components['schemas']['ServerResponse'];

export type Stream = components['schemas']['StreamResponse'];
