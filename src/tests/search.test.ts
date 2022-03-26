import test from 'ava';
import {NetherGamesClient} from '../client.js';

const client = new NetherGamesClient('testing');

test('simple search works', async t => {
  const search = await client.search.simple('NetherGames');
  t.is(Array.isArray(search) && search.length === 2, true);
});

test('fulltext search works', async t => {
  const search = await client.search.fulltext('NetherGames');
  t.is(Array.isArray(search) && search.length > 0, true);
});
