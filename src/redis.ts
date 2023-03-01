import type Redis from 'ioredis'
import {CacheManager} from './cache.js'
import type {Faction, Guild, Player} from './resources.js'

export class RedisCacheManager extends CacheManager {
  public constructor(
    private readonly redis: Redis,
    private readonly keyPrefix = 'nethergames',
    private readonly ttl = 60,
  ) {
    super()
  }

  public override async addPlayer(player: Player): Promise<void> {
    await this.redis.set(`${this.keyPrefix}:player:xuid:${player.xuid}`, JSON.stringify(player), 'EX', this.ttl)
    await this.redis.set(`${this.keyPrefix}:player:name:${player.name}`, player.xuid, 'EX', this.ttl)
  }

  public override async addGuild(guild: Guild): Promise<void> {
    await this.redis.set(`${this.keyPrefix}:guilds:id:${guild.id}`, JSON.stringify(guild), 'EX', this.ttl)
    await this.redis.set(`${this.keyPrefix}:guilds:name:${guild.name}`, guild.id, 'EX', this.ttl)
  }

  public override async addFaction(faction: Faction): Promise<void> {
    await this.redis.set(`${this.keyPrefix}:factions:id:${faction.id}`, JSON.stringify(faction), 'EX', this.ttl)
    await this.redis.set(`${this.keyPrefix}:factions:name:${faction.name}`, faction.id, 'EX', this.ttl)
  }

  public override async getPlayerByXuid(xuid: string): Promise<Player | null> {
    const player = await this.redis.get(`${this.keyPrefix}:players:xuid:${xuid}`)
    return player ? JSON.parse(player) : null
  }

  public override async getPlayerByName(name: string): Promise<Player | null> {
    const xuid = await this.redis.get(`${this.keyPrefix}:players:name:${name}`)
    return xuid ? this.getPlayerByXuid(xuid) : null
  }

  public override async getGuildById(id: number): Promise<Guild | null> {
    const guild = await this.redis.get(`${this.keyPrefix}:guilds:id:${id}`)
    return guild ? JSON.parse(guild) : null
  }

  public override async getGuildByName(name: string): Promise<Guild | null> {
    const id = await this.redis.get(`${this.keyPrefix}:guilds:name:${name}`)
    return id ? this.getGuildById(Number(id)) : null
  }

  public override async getFactionById(id: number): Promise<Faction | null> {
    const faction = await this.redis.get(`${this.keyPrefix}:factions:id:${id}`)
    return faction ? JSON.parse(faction) : null
  }

  public override async getFactionByName(name: string): Promise<Faction | null> {
    const id = await this.redis.get(`${this.keyPrefix}:factions:name:${name}`)
    return id ? this.getFactionById(Number(id)) : null
  }

  public override async clear(): Promise<void> {
    await this.redis.flushdb()
  }
}
