# @nethergames/api

Fully typed client for the NetherGames API.

## Installation

```sh
npm install @nethergames/api
```

## Usage

```js
import {NetherGamesClient} from '@nethergames/api';

const ng = new NetherGamesClient(process.env.NG_API_KEY);
const player = await ng.players.retrieve('Hampus3770');
const guild = await ng.guilds.retrieve(player.guild);

// ...
```
