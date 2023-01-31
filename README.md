# @nethergames/api

Fully typed client for the NetherGames API. This package
[requires ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Install

```sh
npm install @nethergames/api
```

## Usage

```js
import {NetherGamesClient} from '@nethergames/api'

const ng = new NetherGamesClient(process.env.NG_API_KEY)
const player = await ng.players.retrieve('Hampus3770')
const guild = await ng.guilds.retrieve(player.guild)
```

## API

### new NetherGamesClient(apiKey?, options?)

Returns a new [instance](#instance).

### options

Type: `object`

#### baseUrl

Type: `string`\
Default: `https://api.ngmc.co`

API host to use when sending requests.

#### cacheMaxSize

Type: `number`\
Default: `1000`

The maximum amount of LRU objects to hold in memory.

#### userAgent

Type: `string`\
Default: `NetherGames-API-Client/2.6.7`

User-agent to use when sending requests.

#### userAgentAppendix

_Optional_\
Type: `string`

Append an identifier to the user agent in parentheses.\
A unique identifier allows us to identify requests in our error monitoring tools.\
Example: `Casper's Discord Bot` => `NetherGames-API-Client/2.6.7 (Casper's Discord Bot)`

### Instance

All resource methods return a Promise, so you must await them.

#### .announcements

Returns an [`AnnouncementsResource`](#announcements-1).

#### .factions

Returns a [`FactionsResource`](#factions-1).

#### .guilds

Returns a [`GuildsResource`](#guilds-1).

#### .leaderboard

Returns a [`LeaderboardResource`](#leaderboard-1).

#### .players

Returns a [`PlayersResource`](#players-1).

#### .search

Returns a [`SearchResource`](#search-1).

#### .servers

Returns a [`ServersResource`](#servers-1).

#### .status

Returns a [`StatusResource`](#status-1).

#### .stream

Returns a [`StreamResource`](#stream-1).

#### .updates

Returns an [`UpdatesResource`](#updates-1).

#### .lastBuildId

Type: `string`\
Default: `null`

The build ID returned from the previous request.

#### .lastRateLimit

Type: `object`\
Default: `null`

The rate limit returned from the previous request.

#### .lastServerMeta

Type: `object`\
Default: `null`

Stores the last retrieved [server metadata](#meta-docs) object. Useful for caching at startup.

#### .on(event, callback)

Event emitter for `error`, `request`, and `response`. Useful for debugging.

### Announcements

#### .list(type, limit?) [Docs](https://docs.nethergames.org/#operation/Get%20Announcements)

List announcements for a specified type and an optional limit.

### Factions

#### .retrieve(faction, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Faction)

Retrieve a faction by name or null if not found.

#### .search(faction[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Factions)

Find many (1-100) factions at once.

#### .list(params?) [Docs](https://docs.nethergames.org/#operation/Get%20Factions)

A paginated list of factions.

#### .check(faction) [Docs](https://docs.nethergames.org/#operation/Get%20Faction%20Status)

Check if the specified faction name or ID exists.

### Guilds

#### .retrieve(guild, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Guild)

Retrieve a guild by name, or null if not found.

#### .search(guild[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Guilds)

Find many (1-100) guilds at once.

#### .list(params?) [Docs](https://docs.nethergames.org/#operation/Get%20Guilds)

A paginated list of guilds.

#### .check(guild) [Docs](https://docs.nethergames.org/#operation/Get%20Guild%20Status)

Check if the specified guild name or ID exists.

### Leaderboard

#### .list(type, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Leaderboard)

Return the leaderboard for a specified type with optional params.

#### .bulk(query[]) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Leaderboards)

Find many (1-100) leaderboards at once.

### Players

#### .retrieve(player, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Player)

Retrieve a player by name or null if not found.

#### .search(player[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Players)

Find many (1-100) players at once.

#### .list(params?) [Docs](https://docs.nethergames.org/#operation/Get%20Players)

A paginated list of players.

#### .leaderboard(player, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Leaderboard)

Retrieve a player leaderboard, or null if not found.

#### .leaderboardBulk(player[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Player%20Leaderboards)

Find many (1-100) player leaderboards at once.

#### .avatar(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Avatar)

Retrieve a player avatar object.

#### .skin(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Skin)

Retrieve a player's skin object.

#### .stats(player, type) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Stats%20by%20Type)

Retrieve a player's stats for a specified type.

#### .statsHistory(player, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Stats%20History)

Retrieve hourly player stats history. API key required to request new players.

#### .statsHistoryBulk(players, params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Player%20Stats%20History)

Retrieve hourly player stats history in bulk. API key required to request new players.

#### .xuidMapping(xuidOrUsername[]) [Docs](https://docs.nethergames.org/#operation/Get%20XUID%20Mapping)

Get a key-value mapping of XUIDs to usernames or vice versa.

#### .punishments(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Punishments)

Retrieve a player's punishments.

#### .check(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Status)

Check if a player by the specified username or XUID exists.

### Search

#### .simple(name) [Docs](https://docs.nethergames.org/#operation/Get%20Search%20Results)

Performs a "simple" search, returning exact matches for `player`, `guild`, and `faction`.

#### .fulltext(query, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Full-Text%20Search%20Results)

Performs a "fulltext" search, returning partial name matches for the query for all types.

#### Servers

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Servers)

Retrieve server statistics.

#### .meta() [Docs](https://docs.nethergames.org/#operation/Get%20Server%20Metadata)

Retrieve server metadata.

#### .ping(ip = 'play.nethergames.org', port = 19132) [Docs](https://docs.nethergames.org/#operation/Get%20Server%20Ping)

Retrieve server data for any `*.nethergames.org` IP or null if not found.

#### .playerCount() [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Count)

Retrieve the total player count (cached for one hour).

### Status

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Service%20Status)

Retrieve service status.

### Stream

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Stream%20Status)

Retrieve YouTube streaming status.

### Updates

#### .list(params?) [Docs](https://docs.nethergames.org/#operation/Get%20Updates)

List server updates.
