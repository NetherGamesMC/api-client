import type {DMStatus, MinecraftColor, MinecraftFormat, Rank, Tier, VoteStatus} from './constants'
import {PlayerFlags} from './constants.js'
import {hasFlag} from './utils.js'

/**
 * Players are the main resource of NetherGames. Keep in mind that some fields may not exist unless specifically
 * included when fetching.
 */
export class Player {
  /**
   * Unique identifier for the player.
   */
  public readonly xuid!: string

  /**
   * The player's Xbox Live Gamertag.
   */
  public readonly name!: string

  /**
   * Absolute URL to the player's avatar.
   */
  public readonly avatar!: string

  /**
   * Absolute URL to the player's skin.
   */
  public readonly skin!: string

  /**
   * The player is currently online.
   */
  public readonly online!: boolean

  /**
   * Bitfield of the player's flags. Prefer the convenience properties.
   */
  public readonly flags!: number

  /**
   * The player has a premium rank.
   */
  public get premium(): boolean {
    return hasFlag(this.flags, PlayerFlags.PREMIUM)
  }

  /**
   * The player is a Community Developer Program member.
   */
  public get communityDeveloper(): boolean {
    return hasFlag(this.flags, PlayerFlags.COMMUNITY_DEVELOPER)
  }

  /**
   * The player prefers not to display their stats in the portal.
   */
  public get statsDisabled(): boolean {
    return hasFlag(this.flags, PlayerFlags.DISABLE_STATS)
  }

  /**
   * The player's DM privacy option.
   */
  public readonly dmStatus!: DMStatus

  /**
   * The player's biography. Empty if not set.
   */
  public readonly bio!: string

  /**
   * The player's Discord ID.
   */
  public readonly discordId!: string | null

  /**
   * The player's Discord tag.
   */
  public readonly discordTag!: string | null

  /**
   * The player's guild name.
   */
  public readonly guild!: string | null

  /**
   * The player's ranks.
   */
  public readonly ranks!: Rank[]

  /**
   * The player's tier.
   */
  public readonly tier!: Tier | null

  /**
   * The player is currently banned.
   */
  public readonly banned!: boolean

  /**
   * If `banned` is true, when their ban expires.
   */
  public readonly bannedUntil!: Date | null

  /**
   * The player is currently muted.
   */
  public readonly muted!: boolean

  /**
   * If `muted` is true, when their mute expires.
   */
  public readonly mutedUntil!: Date | null

  /**
   * The player is a staff member.
   */
  public readonly staff!: boolean

  /**
   * The player has an active Titan subscription.
   */
  public readonly titan!: boolean

  /**
   * If `titan` is true, when their Titan subscription expires.
   */
  public readonly titanUntil!: Date | null

  /**
   * Approximate timestamp of when the player last received a premium rank.
   */
  public readonly lastRankTimestamp!: Date | null

  /**
   * The player's vote status.
   */
  public readonly voteStatus!: VoteStatus

  /**
   * When the player first joined the server, or null if unknown.
   */
  public readonly createdAt!: Date | null

  /**
   * When the player last joined the server, or null if unknown.
   */
  public readonly lastSeenAt!: Date | null

  /**
   * The name of the server the player was last seen on.
   */
  public readonly lastSeenServer!: string | null

  /**
   * The player's total crate keys.
   */
  public readonly crateKeys!: number

  /**
   * The player's total credits.
   */
  public readonly credits!: number

  /**
   * The player's kills (could be inaccurate, see `totalKills`).
   */
  public readonly kills!: number

  /**
   * The player's deaths (could be inaccurate, see `totalDeaths`).
   */
  public readonly deaths!: number

  /**
   * The player's K/D ratio (uses `deaths`).
   */
  public readonly kdr!: number

  /**
   * The player's total kills.
   */
  public readonly totalKills!: number

  /**
   * The player's total deaths.
   */
  public readonly totalDeaths!: number

  /**
   * The player's total K/D ratio (uses `totalDeaths`).
   */
  public readonly totalKdr!: number

  /**
   * The player's total XP.
   */
  public readonly xp!: number

  /**
   * The player's level (calculated from `xp`).
   */
  public readonly level!: number

  /**
   * The player's total wins.
   */
  public readonly wins!: number

  /**
   * The player's total losses.
   */
  public readonly losses!: number

  /**
   * The player's W/L ratio.
   */
  public readonly wlr!: number

  /**
   * The player's formatted level string (with Minecraft color codes).
   */
  public readonly formattedLevel!: string

  /**
   * The HEX color codes included in the player's level.
   */
  public readonly levelColors!: MinecraftColor[]

  /**
   * The Minecraft format code for the player's level.
   */
  public readonly levelFormat!: MinecraftFormat

  /**
   * The HEX color codes corresponding to the player's rank index.
   */
  public readonly rankColors!: string[]

  /**
   * The HEX color code for the player's tier, if any.
   */
  public readonly tierColor!: string | null

  /**
   * Absolute URL to the player's YouTube channel, if `rank` has YouTube or Partner.
   */
  public readonly youtubeChannelUrl!: string | null

  /**
   * Amount of kills until the player reaches the nearest integer K/D ratio.
   */
  public readonly killsToNextKdr!: number

  /**
   * Amount of wins until the player reaches the nearest integer W/L ratio.
   */
  public readonly winsToNextWlr!: number

  /**
   * Amount of XP until the player reaches the next level.
   */
  public readonly xpToNextLevel!: number

  /**
   * The player's Discovered Tokens in the lobby.
   */
  public readonly discoveredTokens!: string[]

  /**
   * The player's Discovered Zones in the lobby.
   */
  public readonly discoveredZones!: string[]
}

export class Guild {
  public readonly id!: number
  public readonly name!: string
}

export class Faction {
  public readonly id!: number
  public readonly name!: string
}

export class Leaderboard {}
export class Search {}
export class Server {}
export class ServerUpdate {}
export class Stream {}
export class Announcement {}
export class Discord {}
export class Application {}
