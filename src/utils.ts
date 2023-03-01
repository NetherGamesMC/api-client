import type {Headers} from 'undici'
import {LEADERBOARD_COLUMNS_NESTED, LEADERBOARD_SUBTYPES} from './constants.js'

export function hasFlag(flags: number, flag: number): boolean {
  return (flags & flag) === flag
}

export type RateLimitHeaders = {
  bucket: string
  limit: number
  remaining: number
  reset: number
  resetAfter: number
  global: boolean
}

export function parseRateLimitHeaders(headers: Headers): RateLimitHeaders {
  return {
    bucket: headers.get('x-ratelimit-bucket') ?? '',
    limit: Number(headers.get('x-ratelimit-limit') ?? '0'),
    remaining: Number(headers.get('x-ratelimit-remaining') ?? '0'),
    reset: Number(headers.get('x-ratelimit-reset') ?? '0') * 1_000,
    resetAfter: Number(headers.get('x-ratelimit-reset-after') ?? '0') * 1_000,
    global: headers.get('x-ratelimit-global') === 'true',
  }
}

export type CacheHeaders = {
  status: 'HIT' | 'MISS'
  remaining: number
}

export function parseCacheHeaders(headers: Headers): CacheHeaders {
  return {
    status: headers.get('ng-cache-status') as 'HIT' | 'MISS',
    remaining: Number(headers.get('ng-cache-ttl') ?? '0') * 1_000,
  }
}

function getObjectKeys(obj: Record<string, any>): Map<string, string[]> {
  const result = new Map<string, string[]>()
  for (const [key, value] of Object.entries(obj)) {
    if (Object.keys(value).length > 0) {
      result.set(key, Object.keys(value))
    } else {
      result.set('total', [...(result.get('total') ?? []), key])
    }
  }

  return result
}

type ParseResult = {success: false; values: Record<string, string[]>} | {success: true; column: string}

export function parseLeaderboardColumn(
  game: string | null = 'total',
  type: string | null = 'total',
  subtype: string | null = null,
): ParseResult {
  const column = [game, type, subtype].filter(v => v && v !== 'total').join('_')
  const isSubtypeValid = subtype && LEADERBOARD_SUBTYPES.has(subtype)

  if (!game && !type && isSubtypeValid) {
    return {success: true, column}
  }

  const gameRef = LEADERBOARD_COLUMNS_NESTED[game as keyof typeof LEADERBOARD_COLUMNS_NESTED]
  if (!gameRef) {
    return {success: false, values: Object.fromEntries(getObjectKeys(LEADERBOARD_COLUMNS_NESTED))}
  }

  if (Object.keys(gameRef).length === 0 && !type) {
    return {success: true, column}
  }

  const typeRef = gameRef[type as keyof typeof gameRef]
  if (!typeRef) {
    const gameKeys = getObjectKeys(gameRef)
    if (subtype && isSubtypeValid) {
      for (const subtype of LEADERBOARD_SUBTYPES) {
        gameKeys.delete(subtype)
      }
    }

    return {success: false, values: Object.fromEntries(gameKeys)}
  }

  if (Object.keys(typeRef).length === 0 && !subtype) {
    return {success: true, column}
  }

  const subtypeRef = typeRef[subtype as keyof typeof typeRef]
  if (!subtypeRef) {
    return {success: false, values: Object.fromEntries(getObjectKeys(gameRef))}
  }

  return {success: true, column}
}
