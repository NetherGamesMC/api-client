import test from 'ava';
import {NetherGamesClient} from '../client.js';

const client = new NetherGamesClient('testing');

test('retrieving status works', async t => {
  await t.notThrowsAsync(() => client.status.retrieve());
});
