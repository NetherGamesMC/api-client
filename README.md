# @nethergames/api

Fully typed client for the NetherGames API. This package
[requires ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Install

```sh
npm install @nethergames/api
```

## Usage

```js
import {NetherGamesClient} from '@nethergames/api';

const ng = new NetherGamesClient(process.env.NG_API_KEY);
const player = await ng.players.retrieve('Hampus3770');
const guild = await ng.guilds.retrieve(player.guild);
```

## API

### new NetherGamesClient(apiKey?, options?)

Returns a new [instance](#instance).

### options

Type: `object`

#### baseUrl

Type: `string`\
Default: `https://apiv2.nethergames.org`

API host to use when sending requests.

#### cacheMaxSize

Type: `number`\
Default: `1000`

Maximum amount of LRU objects to hold in memory.

#### userAgent

Type: `string`\
Default: `NetherGames-API-Client/1.1.3`

User agent to use when sending requests.

#### userAgentAppendix

_Optional_\
Type: `string`

Append an identifier to user agent in parentheses.\
This allows us to better identify requests in our error monitoring tools.\
Example: `Casper's Discord Bot` => `NetherGames-API-Client/1.1.3 (Casper's Discord Bot)`

### Instance

All resource methods return a Promise, so they must be `await`ed.

#### .announcements

Returns an [`AnnouncementsResource`](#announcements).

#### .factions

Returns a [`FactionsResource`](#factions).

#### .guilds

Returns a [`GuildsResource`](#guilds).

#### .leaderboard

Returns a [`LeaderboardResource`](#leaderboard).

#### .players

Returns a [`PlayersResource`](#players).

#### .search

Returns a [`SearchResource`](#search).

#### .servers

Returns a [`ServersResource`](#servers).

#### .status

Returns a [`StatusResource`](#status).

#### .stream

Returns a [`StreamResource`](#stream).

#### .lastBuildId

Type: `string`\
Default: `null`

Stores the last seen API build ID from the last request.

#### .lastRateLimit

Type: `object`\
Default: `null`

Stores the last seen API rate limit object from the last request.

#### .lastServerMeta

Type: `object`\
Default: `null`

Stores the last retrieved [server metadata](#meta-docs) object. Useful for caching at startup.

#### .on(event, callback)

Event emitter for `error`, `request` and `response`. Useful for debugging.

### Announcements

#### .list(type, limit?) [Docs](https://docs.nethergames.org/#operation/Get%20Announcements)

List announcements for a specified type and an optional limit.

### Factions

#### .retrieve(faction) [Docs](https://docs.nethergames.org/#operation/Get%20Faction)

Retrieve a faction by name, or null if not found.

#### .search(faction[]) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Factions)

Find many (1-100) factions at once.

### Guilds

#### .retrieve(guild) [Docs](https://docs.nethergames.org/#operation/Get%20Guild)

Retrieve a guild by name, or null if not found.

#### .search(guild[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Guilds)

Find many (1-100) guilds at once.

### Leaderboard

#### .list(type, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Leaderboard)

Return the leaderboard for a specified type with optional params.

#### .bulk(query[]) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Leaderboards)

Find many (1-100) leaderboards at once.

### Players

#### .retrieve(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player)

Retrieve a player by name, or null if not found.

#### .search(player[], params?) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Players)

Find many (1-100) players at once.

#### .leaderboard(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Leaderboard)

Retrieve a player leaderboard, or null if not found.

#### .leaderboardBulk(player[]) [Docs](https://docs.nethergames.org/#operation/Bulk%20Get%20Player%20Leaderboards)

Find many (1-100) player leaderboards at once.

#### .avatar(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Avatar)

Retrieve a player avatar object.

#### .skin(player) [Docs](https://docs.nethergames.org/#operation/Get%20Player%20Skin)

Retrieve a player skin object.

#### .xuidMapping(xuidOrUsername[]) [Docs](https://docs.nethergames.org/#operation/Get%20XUID%20Mapping)

Get a key-value mapping of XUIDs to usernames or vice versa.

### Search

#### .simple(name) [Docs](https://docs.nethergames.org/#operation/Get%20Search%20Results)

Performs a "simple" search, returning exact matches for `player`, `guild` and `faction`.

#### .fulltext(query, params?) [Docs](https://docs.nethergames.org/#operation/Get%20Full-Text%20Search%20Results)

Performs a "fulltext" search, returning partial name matches for the query for all types.

#### Servers

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Servers)

Retrieve server statistics.

#### .meta() [Docs](https://docs.nethergames.org/#operation/Get%20Server%20Metadata)

Retrieve server metadata.

#### .ping(ip = 'play.nethergames.org', port = 19132) [Docs](https://docs.nethergames.org/#operation/Get%20Server%20Ping)

Retrieve server ping data, or null if not found.

### Status

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Service%20Status)

Retrieve service status.

### Stream

#### .retrieve() [Docs](https://docs.nethergames.org/#operation/Get%20Stream)

Retrieve stream data.
