import type {Player, Guild, Faction} from './resources'

export class CacheManager {
  public constructor(
    private readonly playersByXuid = new Map<string, Player>(),
    private readonly playersByName = new Map<string, string>(),
    private readonly guildsById = new Map<number, Guild>(),
    private readonly guildsByName = new Map<string, number>(),
    private readonly factionsById = new Map<number, Faction>(),
    private readonly factionsByName = new Map<string, number>(),
  ) {}

  public async addPlayer(player: Player): Promise<void> {
    this.playersByXuid.set(player.xuid, player)
    this.playersByName.set(player.name, player.xuid)
  }

  public async addGuild(guild: Guild): Promise<void> {
    this.guildsById.set(guild.id, guild)
    this.guildsByName.set(guild.name, guild.id)
  }

  public async addFaction(faction: Faction): Promise<void> {
    this.factionsById.set(faction.id, faction)
    this.factionsByName.set(faction.name, faction.id)
  }

  public async getPlayerByXuid(xuid: string): Promise<Player | null> {
    return this.playersByXuid.get(xuid) ?? null
  }

  public async getPlayerByName(name: string): Promise<Player | null> {
    const xuid = this.playersByName.get(name)
    return xuid ? this.getPlayerByXuid(xuid) : null
  }

  public async getGuildById(id: number): Promise<Guild | null> {
    return this.guildsById.get(id) ?? null
  }

  public async getGuildByName(name: string): Promise<Guild | null> {
    const id = this.guildsByName.get(name)
    return id ? this.getGuildById(id) : null
  }

  public async getFactionById(id: number): Promise<Faction | null> {
    return this.factionsById.get(id) ?? null
  }

  public async getFactionByName(name: string): Promise<Faction | null> {
    const id = this.factionsByName.get(name)
    return id ? this.getFactionById(id) : null
  }

  public async clear(): Promise<void> {
    this.playersByXuid.clear()
    this.playersByName.clear()
    this.guildsById.clear()
    this.guildsByName.clear()
    this.factionsById.clear()
    this.factionsByName.clear()
  }
}
