import type {RateLimitHeaders} from './utils.js'

export class NetherGamesError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'NetherGamesError'
  }
}

type Errors = Record<string, any>[]

export class NetherGamesRequestError extends NetherGamesError {
  public readonly code: number
  public readonly status: number
  public readonly errors?: Errors | undefined

  public constructor(options: {code: number; message: string; status: number; errors?: Errors}) {
    super(options.message)
    this.name = 'NetherGamesRequestError'
    this.code = options.code
    this.status = options.status
    this.errors = options.errors
  }
}

export class NetherGamesRateLimitError extends NetherGamesError {
  public readonly bucket: string
  public readonly limit: number
  public readonly remaining: number
  public readonly reset: number
  public readonly resetAfter: number
  public readonly global: boolean

  public constructor(message: string, headers: RateLimitHeaders) {
    super(message)
    this.name = 'NetherGamesRateLimitError'
    this.bucket = headers.bucket
    this.limit = headers.limit
    this.remaining = headers.remaining
    this.reset = headers.reset
    this.resetAfter = headers.resetAfter
    this.global = headers.global
  }
}

export class NetherGamesValidationError extends NetherGamesError {
  public readonly game: string
  public readonly type: string
  public readonly options: string[]

  public constructor(game: string, type: string, options: string[]) {
    super(`Cannot use type ${type} for game ${game}.`)
    this.name = 'NetherGamesValidationError'
    this.game = game
    this.type = type
    this.options = options
  }
}
