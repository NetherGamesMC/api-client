export enum LeaderboardColumn {
  BH_WINS = 'bh_wins',
  BW_BEDS_BROKEN = 'bw_beds_broken',
  BW_DOUBLES_BEDS_BROKEN = 'bw_doubles_beds_broken',
  BW_DOUBLES_FINAL_KILLS = 'bw_doubles_final_kills',
  BW_DOUBLES_KILLS = 'bw_doubles_kills',
  BW_DOUBLES_WINS = 'bw_doubles_wins',
  BW_FINAL_KILLS = 'bw_final_kills',
  BW_KILLS = 'bw_kills',
  BW_SOLO_BEDS_BROKEN = 'bw_solo_beds_broken',
  BW_SOLO_FINAL_KILLS = 'bw_solo_final_kills',
  BW_SOLO_KILLS = 'bw_solo_kills',
  BW_SOLO_WINS = 'bw_solo_wins',
  BW_SQUADS_BEDS_BROKEN = 'bw_squads_beds_broken',
  BW_SQUADS_FINAL_KILLS = 'bw_squads_final_kills',
  BW_SQUADS_KILLS = 'bw_squads_kills',
  BW_SQUADS_WINS = 'bw_squads_wins',
  BW_TRIOS_BEDS_BROKEN = 'bw_trios_beds_broken',
  BW_TRIOS_FINAL_KILLS = 'bw_trios_final_kills',
  BW_TRIOS_KILLS = 'bw_trios_kills',
  BW_TRIOS_WINS = 'bw_trios_wins',
  BW_WINS = 'bw_wins',
  CQ_FLAGS_CAPTURED = 'cq_flags_captured',
  CQ_KILLS = 'cq_kills',
  CQ_WINS = 'cq_wins',
  DUELS_KILLS = 'duels_kills',
  DUELS_WINS = 'duels_wins',
  KILLS = 'kills',
  MM_BOW_KILLS = 'mm_bow_kills',
  MM_CLASSIC_KILLS = 'mm_classic_kills',
  MM_CLASSIC_WINS = 'mm_classic_wins',
  MM_INFECTION_KILLS = 'mm_infection_kills',
  MM_INFECTION_WINS = 'mm_infection_wins',
  MM_KILLS = 'mm_kills',
  MM_KNIFE_KILLS = 'mm_knife_kills',
  MM_THROW_KNIFE_KILLS = 'mm_throw_knife_kills',
  MM_WINS = 'mm_wins',
  MS_WINS = 'ms_wins',
  SC_WINS = 'sc_wins',
  SG_KILLS = 'sg_kills',
  SG_WINS = 'sg_wins',
  SW_DOUBLES_INSANE_KILLS = 'sw_doubles_insane_kills',
  SW_DOUBLES_KILLS = 'sw_doubles_kills',
  SW_DOUBLES_NORMAL_KILLS = 'sw_doubles_normal_kills',
  SW_DOUBLES_WINS = 'sw_doubles_wins',
  SW_KILLS = 'sw_kills',
  SW_SOLO_INSANE_KILLS = 'sw_solo_insane_kills',
  SW_SOLO_KILLS = 'sw_solo_kills',
  SW_SOLO_NORMAL_KILLS = 'sw_solo_normal_kills',
  SW_SOLO_WINS = 'sw_solo_wins',
  SW_WINS = 'sw_wins',
  TB_KILLS = 'tb_kills',
  TB_WINS = 'tb_wins',
  UHC_KILLS = 'uhc_kills',
  UHC_WINS = 'uhc_wins',
  WINS = 'wins',
}

// Deprecated
export enum LeaderboardScope {
  BEST_STREAK = 'bestStreak',
  KILLS = 'kills',
  STREAK = 'streak',
}

export enum LeaderboardSortBy {
  BALANCE = 'balance',
  PLAYER_BANK = 'bank',
  PLAYER_BEST_STREAK = 'bestStreak',
  PLAYER_BOUNTY = 'bounty',
  PLAYER_COINS = 'coins',
  PLAYER_KILLS = 'kills',
  PLAYER_KILL_STREAK = 'killStreak',
  PLAYER_MONEY = 'money',
  PLAYER_STREAK = 'streak',
  PLAYER_XP = 'xp',
  STRENGTH = 'strength',
}

export enum LeaderboardType {
  FACTIONS = 'factions',
  FACTIONS_PLAYER = 'factionsPlayer',
  GAME = 'game',
  GUILDS = 'guilds',
  MAP_VOTES = 'mapVotes',
  PLAYER_AGE = 'oldest',
  PLAYER_CRATE_KEYS = 'crateKeys',
  PLAYER_CREDITS = 'credits',
  PLAYER_KDR = 'kdr',
  PLAYER_KILLS = 'kills',
  PLAYER_PARKOUR = 'parkour',
  PLAYER_PLAYTIME = 'playtime',
  PLAYER_VOTES = 'voters',
  PLAYER_WINS = 'wins',
  PLAYER_WLR = 'wlr',
  PLAYER_XP = 'xp',
  SKYBLOCK = 'skyblock',
}

export enum LeaderboardKdrPrefix {
  BW = 'bw',
  BW_DOUBLES = 'bw_doubles',
  BW_SOLO = 'bw_solo',
  BW_SQUADS = 'bw_squads',
  BW_TRIOS = 'bw_trios',
  CQ = 'cq',
  DUELS = 'duels',
  MM = 'mm',
  MM_CLASSIC = 'mm_classic',
  MM_INFECTION = 'mm_infection',
  SG = 'sg',
  SW = 'sw',
  SW_DOUBLES = 'sw_doubles',
  SW_DOUBLES_INSANE = 'sw_doubles_insane',
  SW_DOUBLES_NORMAL = 'sw_doubles_normal',
  SW_SOLO = 'sw_solo',
  SW_SOLO_INSANE = 'sw_solo_insane',
  SW_SOLO_NORMAL = 'sw_solo_normal',
  TB = 'tb',
  UHC = 'uhc',
}

export enum LeaderboardWlrPrefix {
  DUELS = 'duels',
  SW = 'sw',
  SW_DOUBLES = 'sw_doubles',
  SW_SOLO = 'sw_solo',
  TB = 'tb',
}

export const LEADERBOARD_MAPPINGS = {
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
  uhc: ['kills', 'wins'],
} as const

export type LeaderboardMappings = typeof LEADERBOARD_MAPPINGS
export type LeaderboardKey = keyof LeaderboardMappings

export const LEADERBOARD_COLUMNS_NESTED = {
  total: {kills: {}, wins: {}, total: {kills: {}, wins: {}}},
  bh: {total: {wins: {}}},
  cq: {total: {kills: {}, wins: {}, flags_captured: {}}},
  duels: {total: {kills: {}, wins: {}}},
  ms: {total: {wins: {}}},
  sc: {total: {wins: {}}},
  sg: {total: {kills: {}, wins: {}}},
  tb: {total: {kills: {}, wins: {}}},
  uhc: {total: {kills: {}, wins: {}}},
  bw: {
    total: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    doubles: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    solo: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    squads: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    trios: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
  },
  mm: {
    total: {kills: {}, wins: {}, bow_kills: {}, knife_kills: {}, throw_knife_kills: {}},
    classic: {kills: {}, wins: {}},
    infection: {kills: {}, wins: {}},
  },
  sw: {
    total: {kills: {}, wins: {}},
    doubles: {kills: {}, wins: {}, insane_kills: {}, normal_kills: {}},
    solo: {kills: {}, wins: {}, insane_kills: {}, normal_kills: {}},
  },
} as const

export const LEADERBOARD_SUBTYPES = new Set([
  'kills',
  'wins',
  'flags_captured',
  'beds_broken',
  'final_kills',
  'insane_kills',
  'normal_kills',
])

export enum PlayerStatsType {
  GLOBAL = 0,
  DAILY = 1,
  WEEKLY = 2,
  BIWEEKLY = 3,
  MONTHLY = 4,
  YEARLY = 5,
}

export enum LeaderboardPeriod {
  BIWEEKLY = 'biweekly',
  DAILY = 'daily',
  GLOBAL = 'global',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
  YEARLY = 'yearly',
}

export const LeaderboardPeriodToPlayerStatsType: Record<LeaderboardPeriod, PlayerStatsType> = {
  [LeaderboardPeriod.GLOBAL]: PlayerStatsType.GLOBAL,
  [LeaderboardPeriod.DAILY]: PlayerStatsType.DAILY,
  [LeaderboardPeriod.WEEKLY]: PlayerStatsType.WEEKLY,
  [LeaderboardPeriod.BIWEEKLY]: PlayerStatsType.BIWEEKLY,
  [LeaderboardPeriod.MONTHLY]: PlayerStatsType.MONTHLY,
  [LeaderboardPeriod.YEARLY]: PlayerStatsType.YEARLY,
}

export enum PlayerFlags {
  NONE = 0,
  PREMIUM = 1 << 0,
  COMMUNITY_DEVELOPER = 1 << 16,
  DISABLE_STATS = 1 << 18,
}

export enum DMStatus {
  /**
   * Allow incoming DMs from everyone.
   */
  EVERYONE = 0,

  /**
   * Allow incoming DMs from friends only.
   */
  FRIENDS = 1,

  /**
   * Reject incoming DMs from everyone.
   */
  BLOCKED = 2,
}

export enum PunishmentType {
  BAN = 'BAN',
  MUTE = 'MUTE',
}

export enum Rank {
  ADMIN = 'Admin',
  ADVISOR = 'Advisor',
  BUILDER = 'Builder',
  CREW = 'Crew',
  DESIGNER = 'Designer',
  DEVELOPER = 'Dev',
  DISCORD = 'Discord',
  EMERALD = 'Emerald',
  GAME_DESIGNER = 'Game Designer',
  HONOURED = 'Honoured',
  LEGEND = 'Legend',
  MEDIA = 'Media',
  MOD = 'Mod',
  PARTNER = 'Partner',
  SUPERVISOR = 'Supervisor',
  SUPPORT = 'Support',
  SYSTEM = 'System',
  TESTER = 'Tester',
  TITAN = 'Titan',
  TRAINEE = 'Trainee',
  ULTRA = 'Ultra',
  YOUTUBE = 'Youtube',
}

export const RankToColorString: Record<Rank, string> = {
  [Rank.ADMIN]: '#d7342a',
  [Rank.SYSTEM]: '#d7342a',
  [Rank.ADVISOR]: '#9d5bd3',
  [Rank.SUPERVISOR]: '#e257c0',
  [Rank.MOD]: '#3498db',
  [Rank.SUPPORT]: '#9b59b6',
  [Rank.DISCORD]: '#1abc9c',
  [Rank.MEDIA]: '#11806a',
  [Rank.CREW]: '#86f103',
  [Rank.DEVELOPER]: '#e91e63',
  [Rank.BUILDER]: '#065db6',
  [Rank.DESIGNER]: '#9b59b6',
  [Rank.GAME_DESIGNER]: '#c27c0e',
  [Rank.HONOURED]: '#ffa658',
  [Rank.TRAINEE]: '#f1c40f',
  [Rank.PARTNER]: '#e06b00',
  [Rank.YOUTUBE]: '#e95959',
  [Rank.TESTER]: '#00aa00',
  [Rank.TITAN]: '#b91c1c',
  [Rank.LEGEND]: '#02d3f0',
  [Rank.EMERALD]: '#41bb4b',
  [Rank.ULTRA]: '#df9833',
}

export const RANK_SORT_REF = Object.keys(RankToColorString)

export const GUILD_LEADER_RANKS = new Set([Rank.TITAN, Rank.LEGEND])

export const STAFF_RANKS = new Set([
  Rank.ADMIN,
  Rank.ADVISOR,
  Rank.SUPERVISOR,
  Rank.MOD,
  Rank.SUPPORT,
  Rank.DISCORD,
  Rank.MEDIA,
  Rank.CREW,
  Rank.DEVELOPER,
  Rank.BUILDER,
  Rank.DESIGNER,
  Rank.GAME_DESIGNER,
  Rank.TRAINEE,
])

export const TITAN_RANKS = new Set([
  Rank.ADMIN,
  Rank.ADVISOR,
  Rank.SUPERVISOR,
  Rank.MOD,
  Rank.SUPPORT,
  Rank.DISCORD,
  Rank.MEDIA,
  Rank.CREW,
  Rank.DEVELOPER,
  Rank.BUILDER,
  Rank.DESIGNER,
  Rank.GAME_DESIGNER,
  Rank.HONOURED,
  Rank.PARTNER,
])

// Source: https://minecraft.fandom.com/wiki/Formatting_codes#Color_codes
export const ColorCode = {
  0: '000000',
  1: '0000aa',
  2: '00aa00',
  3: '00aaaa',
  4: 'aa0000',
  5: 'aa00aa',
  6: 'ffaa00',
  7: 'aaaaaa',
  8: '555555',
  9: '5555ff',
  a: '55ff55',
  b: '55ffff',
  c: 'ff5555',
  d: 'ff55ff',
  e: 'ffff55',
  f: 'ffffff',
  g: 'ddd605',
} as const

export enum MinecraftColor {
  AQUA = '#55ffff',
  BLACK = '#000000',
  BLUE = '#5555ff',
  DARK_AQUA = '#00aaaa',
  DARK_BLUE = '#0000aa',
  DARK_GRAY = '#555555',
  DARK_GREEN = '#00aa00',
  DARK_PURPLE = '#aa00aa',
  DARK_RED = '#aa0000',
  GOLD = '#ffaa00',
  GRAY = '#aaaaaa',
  GREEN = '#55ff55',
  LIGHT_PURPLE = '#ff55ff',
  MINECOIN_GOLD = '#ddd605',
  RED = '#ff5555',
  WHITE = '#ffffff',
  YELLOW = '#ffff55',
}

export enum MinecraftColorCode {
  AQUA = '§b',
  BLACK = '§0',
  BLUE = '§9',
  DARK_AQUA = '§3',
  DARK_BLUE = '§1',
  DARK_GRAY = '§8',
  DARK_GREEN = '§2',
  DARK_PURPLE = '§5',
  DARK_RED = '§4',
  GOLD = '§6',
  GRAY = '§7',
  GREEN = '§a',
  LIGHT_PURPLE = '§d',
  MINECOIN_GOLD = '§k',
  RED = '§c',
  WHITE = '§f',
  YELLOW = '§e',
}

export const MinecraftColorToColorCode: Record<MinecraftColor, MinecraftColorCode> = {
  [MinecraftColor.BLACK]: MinecraftColorCode.BLACK,
  [MinecraftColor.DARK_BLUE]: MinecraftColorCode.DARK_BLUE,
  [MinecraftColor.DARK_GREEN]: MinecraftColorCode.DARK_GREEN,
  [MinecraftColor.DARK_AQUA]: MinecraftColorCode.DARK_AQUA,
  [MinecraftColor.DARK_RED]: MinecraftColorCode.DARK_RED,
  [MinecraftColor.DARK_PURPLE]: MinecraftColorCode.DARK_PURPLE,
  [MinecraftColor.GOLD]: MinecraftColorCode.GOLD,
  [MinecraftColor.GRAY]: MinecraftColorCode.GRAY,
  [MinecraftColor.DARK_GRAY]: MinecraftColorCode.DARK_GRAY,
  [MinecraftColor.BLUE]: MinecraftColorCode.BLUE,
  [MinecraftColor.GREEN]: MinecraftColorCode.GREEN,
  [MinecraftColor.AQUA]: MinecraftColorCode.AQUA,
  [MinecraftColor.RED]: MinecraftColorCode.RED,
  [MinecraftColor.LIGHT_PURPLE]: MinecraftColorCode.LIGHT_PURPLE,
  [MinecraftColor.YELLOW]: MinecraftColorCode.YELLOW,
  [MinecraftColor.WHITE]: MinecraftColorCode.WHITE,
  [MinecraftColor.MINECOIN_GOLD]: MinecraftColorCode.MINECOIN_GOLD,
}

export enum MinecraftFormat {
  BOLD = '§l',
  ITALIC = '§o',
  OBFUSCATED = '§k',
  RESET = '§r',
}

export enum Tier {
  EAGLE = 'Eagle',
  ELITE = 'Elite',
  GOLD = 'Gold',
  GUARDIAN = 'Guardian',
  SILVER = 'Silver',
}

export const TierToCreditsThreshold: Record<Tier, number> = {
  [Tier.ELITE]: 50_000,
  [Tier.EAGLE]: 40_000,
  [Tier.GUARDIAN]: 20_000,
  [Tier.GOLD]: 10_000,
  [Tier.SILVER]: 5_000,
}

export const TierToMinecraftColor = {
  [Tier.SILVER]: MinecraftColor.GRAY,
  [Tier.GOLD]: MinecraftColor.GOLD,
  [Tier.GUARDIAN]: MinecraftColor.DARK_GREEN,
  [Tier.EAGLE]: MinecraftColor.DARK_RED,
  [Tier.ELITE]: MinecraftColor.DARK_BLUE,
} as const

export enum VoteStatus {
  /**
   * The player has not voted yet.
   */
  NONE = 0,

  /**
   * The player has voted, but they have not claimed their reward yet.
   */
  UNCLAIMED = 1,

  /**
   * The player has both voted and claimed their reward.
   */
  CLAIMED = 2,
}

export const ServerName = {
  AC: 'Arcade',
  BB: 'Build Battle',
  BH: 'Block Hunt',
  BR: 'Battle Royale',
  BW: 'Bedwars',
  CQ: 'Conquests',
  Creative: 'Creative',
  Duels: 'Duels',
  Factions: 'Factions',
  Lobby: 'Lobby',
  MM: 'Murder Mystery',
  MS: 'Momma Says',
  Replay: 'Replay',
  SB: 'Skyblock',
  SC: 'Soccer',
  SG: 'Survival Games',
  SP: 'Spleef',
  SW: 'Skywars',
  TB: 'The Bridge',
  TR: 'TNT Run',
  UHC: 'UHC',
  ac: 'Arcade',
  bb: 'Build Battle',
  bh: 'Block Hunt',
  br: 'Battle Royale',
  bw: 'Bedwars',
  cq: 'Conquests',
  creative: 'Creative',
  duels: 'Duels',
  factions: 'Factions',
  lobby: 'Lobby',
  mm: 'Murder Mystery',
  ms: 'Momma Says',
  replay: 'Replay',
  sb: 'Skyblock',
  sc: 'Soccer',
  sg: 'Survival Games',
  sp: 'Spleef',
  sw: 'Skywars',
  tb: 'The Bridge',
  tr: 'TNT Run',
  uhc: 'UHC',
} as const

export const ServerNameLower = {
  ac: 'AC',
  bb: 'BB',
  bh: 'BH',
  br: 'BR',
  bw: 'BW',
  cq: 'CQ',
  creative: 'Creative',
  duels: 'Duels',
  factions: 'Factions',
  lobby: 'Lobby',
  mm: 'MM',
  ms: 'MS',
  replay: 'Replay',
  sb: 'SB',
  sc: 'SC',
  sg: 'SG',
  sp: 'SP',
  sw: 'SW',
  tb: 'TB',
  tr: 'TR',
  uhc: 'UHC',
} as const

export const SYSTEM_PLAYER_XUID = '2535418039503959'

export enum AnnouncementType {
  BOARD = 'board',
  BOSSBAR = 'bossbar',
  DISCORD = 'discord',
  MESSAGE = 'message',
  TITLE = 'title',
}

export enum GuildFlags {
  NONE = 0,

  /**
   * Officers are included in the guild's Auto-Kick configuration.
   */
  AUTO_KICK_OFFICERS = 1 << 0,

  /**
   * The guild is considered active and eligible for leaderboards.
   */
  ACTIVE = 1 << 1,
}

export enum GuildMemberFlags {
  NONE = 0,

  /**
   * Manually exempted from the guild's Auto-Kick configuration.
   */
  AUTO_KICK_EXEMPT = 1 << 0,
}
