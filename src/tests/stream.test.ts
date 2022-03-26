import test from 'ava';
import {NetherGamesClient} from '../client.js';

const client = new NetherGamesClient('testing');

test('retrieving stream works', async t => {
  const stream = await client.stream.retrieve();
  t.is(typeof stream.streaming === 'boolean', true);
});
