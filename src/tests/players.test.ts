import test from 'ava'

import {NetherGamesClient} from '../client.js'
import {NetherGamesRequestError} from '../errors.js'
import {RANDOM_PLAYERS} from './_data.js'

const client = new NetherGamesClient('testing')

test('retrieving an existing player works', async t => {
  const player = await client.players.retrieve('NetherGamesMC')
  t.is(player!.name, 'NetherGamesMC')
})

test('retrieving multiple players works', async t => {
  const players = await client.players.search(RANDOM_PLAYERS.slice(0, 5))
  t.is(players.length, 5)
})

test('retrieving a missing player works', async t => {
  const player = await client.players.retrieve('this player does not exist')
  t.is(player, null)
})

test('retrieving too many players fails', async t => {
  await t.throwsAsync(() => client.players.search([...RANDOM_PLAYERS, 'NetherGamesMC']), {
    instanceOf: NetherGamesRequestError,
  })
})

test('retrieving a player leaderboard works', async t => {
  await t.notThrowsAsync(() => client.players.leaderboard('NetherGamesMC'))
})

test('retrieving multiple player leaderboards works', async t => {
  await t.notThrowsAsync(() => client.players.leaderboardBulk(RANDOM_PLAYERS.slice(0, 5)))
})

test('retrieving xuid mapping works', async t => {
  const mapping = await client.players.xuidMapping(['2535418039503959', 'NetherGamesMC'])
  t.deepEqual(mapping, {'2535418039503959': 'NetherGamesMC', 'NetherGamesMC': '2535418039503959'})
})
