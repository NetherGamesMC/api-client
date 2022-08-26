import test from 'ava'

import {NetherGamesClient} from '../client.js'
import {NetherGamesRequestError} from '../errors.js'
import {RANDOM_FACTIONS} from './_data.js'

const client = new NetherGamesClient('testing')

test('retrieving an existing faction works', async t => {
  const faction = await client.factions.retrieve('NetherGames')
  t.is(faction!.name, 'NetherGames')
})

test('retrieving multiple factions works', async t => {
  const factions = await client.factions.search(RANDOM_FACTIONS.slice(0, 5))
  t.is(factions.length, 5)
})

test('retrieving a missing faction works', async t => {
  const faction = await client.factions.retrieve('this faction does not exist')
  t.is(faction, null)
})

test.skip('retrieving too many factions fails', async t => {
  await t.throwsAsync(() => client.factions.search([...RANDOM_FACTIONS, 'NetherGames']), {
    instanceOf: NetherGamesRequestError,
  })
})
