import type {NetherGamesClient} from './client'

export class ResourceManager {
  public constructor(public readonly client: NetherGamesClient) {}
}

export class PlayerManager extends ResourceManager {}
export class GuildManager extends ResourceManager {}
export class FactionManager extends ResourceManager {}
export class LeaderboardManager extends ResourceManager {}
export class SearchManager extends ResourceManager {}
export class ServerManager extends ResourceManager {}
export class StreamManager extends ResourceManager {}
export class AnnouncementManager extends ResourceManager {}
export class DiscordManager extends ResourceManager {}
export class ApplicationManager extends ResourceManager {}
