import test from 'ava'

import {NetherGamesClient} from '../client.js'

const client = new NetherGamesClient('testing')

test('retrieving servers works', async t => {
  const servers = await client.servers.retrieve()
  t.is(Object.keys(servers).length > 0, true)
})

test('retrieving server meta works', async t => {
  const meta = await client.servers.meta()
  t.is(Object.keys(meta).length > 0, true)
})

test('retrieving serveer ping works', async t => {
  const ping = await client.servers.ping()
  t.is(Object.keys(ping!).length > 0, true)
})
