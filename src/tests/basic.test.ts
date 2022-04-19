import test from 'ava';
import {NetherGamesClient} from '../client.js';

const client = new NetherGamesClient('testing');

test('lastServerMeta works', async t => {
  const serverMeta = await client.servers.meta();
  t.is(client.lastServerMeta, serverMeta);
  const serverMetaAgain = await client.servers.meta();
  t.is(client.lastServerMeta, serverMetaAgain);
  const serverMetaAgainForGoodMeasure = await client.servers.meta();
  t.is(client.lastServerMeta, serverMetaAgainForGoodMeasure);
  const serverMetaAgainHelpMeIShouldReallyStop = await client.servers.meta();
  t.is(client.lastServerMeta, serverMetaAgainHelpMeIShouldReallyStop);
});
