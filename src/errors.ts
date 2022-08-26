import type {RateLimitHeaders} from './utils.js'

export class NetherGamesError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetherGamesError'
  }
}

type Errors = Array<Record<string, any>>

export class NetherGamesRequestError extends NetherGamesError {
  readonly code: number
  readonly status: number
  readonly errors?: Errors

  constructor(options: {code: number; message: string; status: number; errors?: Errors}) {
    super(options.message)
    this.name = 'NetherGamesRequestError'
    this.code = options.code
    this.status = options.status
    this.errors = options.errors
  }
}

export class NetherGamesRateLimitError extends NetherGamesError {
  readonly bucket: string
  readonly limit: number
  readonly remaining: number
  readonly reset: number
  readonly resetAfter: number
  readonly global: boolean

  constructor(message: string, headers: RateLimitHeaders) {
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
  readonly game: string
  readonly type: string
  readonly options: string[]

  constructor(game: string, type: string, options: string[]) {
    super(`Cannot use type ${type} for game ${game}.`)
    this.name = 'NetherGamesValidationError'
    this.game = game
    this.type = type
    this.options = options
  }
}
