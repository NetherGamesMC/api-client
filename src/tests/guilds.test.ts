import test from 'ava';
import {NetherGamesClient} from '../client.js';
import {NetherGamesRequestError} from '../errors.js';
import {RANDOM_GUILDS} from './_data.js';

const client = new NetherGamesClient('testing');

test('retrieving an existing guild works', async t => {
  const guild = await client.guilds.retrieve('NetherGames');
  t.is(guild!.name, 'NetherGames');
});

test('retrieving multiple guilds works', async t => {
  const guilds = await client.guilds.search(RANDOM_GUILDS.slice(0, 5));
  t.is(guilds.length, 5);
});

test('retrieving a missing guild works', async t => {
  const guild = await client.guilds.retrieve('this guild does not exist');
  t.is(guild, null);
});

test('retrieving too many guilds fails', async t => {
  await t.throwsAsync(() => client.guilds.search([...RANDOM_GUILDS, 'NetherGames']), {
    instanceOf: NetherGamesRequestError,
  });
});
