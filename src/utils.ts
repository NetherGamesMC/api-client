import type {Headers} from 'node-fetch'

import {CDN_HOST, DEFAULT_SKIN_HASH, LEADERBOARD_COLUMNS_NESTED, POSSIBLE_SUBTYPES} from './constants.js'

export interface RateLimitHeaders {
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
    limit: +(headers.get('x-ratelimit-limit') ?? '0'),
    remaining: +(headers.get('x-ratelimit-remaining') ?? '0'),
    reset: +(headers.get('x-ratelimit-reset') ?? '0') * 1000,
    resetAfter: +(headers.get('x-ratelimit-reset-after') ?? '0') * 1000,
    global: headers.get('x-ratelimit-global') === 'true',
  }
}

export interface CacheHeaders {
  status: 'HIT' | 'MISS'
  remaining: number
}

export function parseCacheHeaders(headers: Headers): CacheHeaders {
  return {
    status: headers.get('ng-cache-status') as 'HIT' | 'MISS',
    remaining: +(headers.get('ng-cache-ttl') ?? '0') * 1000,
  }
}

function getObjectKeys(obj: Record<string, any>): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const [key, value] of Object.entries(obj))
    if (Object.keys(value).length > 0) result[key] = Object.keys(value)
    else {
      result.total ??= []
      result.total.push(key)
    }
  return result
}

type ParseResult = {success: true; column: string} | {success: false; values: Record<string, string[]>}

export function parseLeaderboardColumn(
  game?: string | null,
  type?: string | null,
  subtype?: string | null,
): ParseResult {
  const parsedGame = game ?? 'total'
  const parsedType = type ?? 'total'

  const column = [parsedGame, parsedType, subtype].filter(v => v && v !== 'total').join('_')
  const isSubtypeValid = subtype != null && POSSIBLE_SUBTYPES.has(subtype)

  if (game == null && type == null && isSubtypeValid) return {success: true, column}

  const gameRef = LEADERBOARD_COLUMNS_NESTED[parsedGame as keyof typeof LEADERBOARD_COLUMNS_NESTED]
  if (gameRef == null) return {success: false, values: getObjectKeys(LEADERBOARD_COLUMNS_NESTED)}

  if (Object.keys(gameRef).length === 0 && !parsedType) return {success: true, column}

  const typeRef = gameRef[parsedType as keyof typeof gameRef]
  if (typeRef == null) {
    const gameKeys = getObjectKeys(gameRef)
    if (subtype != null && isSubtypeValid) {
      for (const validSubtype of POSSIBLE_SUBTYPES) {
        delete gameKeys[validSubtype]
      }
    }
    return {success: false, values: gameKeys}
  }

  if (Object.keys(typeRef).length === 0 && !subtype) return {success: true, column}

  const subtypeRef = typeRef[subtype as keyof typeof typeRef]
  if (subtypeRef == null) return {success: false, values: getObjectKeys(gameRef)}

  return {success: true, column}
}

export function getSkinUrl(skinHash: string | null): string {
  return `${CDN_HOST}/skins/${skinHash ?? DEFAULT_SKIN_HASH}/full.png`
}

export function getAvatarUrl(skinHash: string | null): string {
  return `${CDN_HOST}/skins/${skinHash ?? DEFAULT_SKIN_HASH}/head.png`
}
