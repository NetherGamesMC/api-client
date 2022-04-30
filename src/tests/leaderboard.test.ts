import test from 'ava';
import {NetherGamesClient} from '../client.js';
import {NetherGamesRequestError} from '../errors.js';

const client = new NetherGamesClient('testing');

test('retrieving the credits leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('credits');
  t.is(leaderboard.length, 100);
});

test('retrieving the factions leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('factions');
  t.is(leaderboard.length, 100);
});

test('retrieving the game leaderboard without a column fails', async t => {
  await t.throwsAsync(() => client.leaderboard.list('game'), {instanceOf: NetherGamesRequestError});
});

test('retrieving the game leaderboard with a column works', async t => {
  const leaderboard = await client.leaderboard.list('game', {column: 'bh_wins'});
  t.is(leaderboard.length, 100);
});

test('retrieving the guilds leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('guilds');
  t.is(leaderboard.length, 100);
});

test('retrieving the kdr leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('kdr');
  t.is(leaderboard.length, 100);
});

test('retrieving the kills leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('kills');
  t.is(leaderboard.length, 100);
});

test('retrieving the parkour leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('parkour');
  t.is(leaderboard.length, 100);
});

test('retrieving the voters leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('voters');
  t.is(leaderboard.length, 100);
});

test('retrieving the wins leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('wins');
  t.is(leaderboard.length, 100);
});

test('retrieving the xp leaderboard works', async t => {
  const leaderboard = await client.leaderboard.list('xp');
  t.is(leaderboard.length, 100);
});

test('retrieving multiple leaderboards works', async t => {
  const leaderboards = await client.leaderboard.bulk([
    {type: 'credits', limit: 10},
    {type: 'factions', limit: 10},
    {type: 'guilds', limit: 10},
    {type: 'kdr', limit: 10},
    {type: 'kills', limit: 10},
    {type: 'parkour', limit: 10},
    {type: 'voters', limit: 10},
    {type: 'wins', limit: 10},
    {type: 'xp', limit: 10},
  ]);
  t.is(leaderboards.length, 9);
});
