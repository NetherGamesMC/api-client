import test from 'ava';
import {NetherGamesClient} from '../client.js';

const client = new NetherGamesClient('testing');

test('listing board announcements works', async t => {
  const announcements = await client.announcements.list('board');
  t.is(Array.isArray(announcements) && announcements.length > 0, true);
});

test('listing message announcements works', async t => {
  const announcements = await client.announcements.list('message');
  t.is(Array.isArray(announcements) && announcements.length > 0, true);
});

test('listing title announcements works', async t => {
  const announcements = await client.announcements.list('title');
  t.is(Array.isArray(announcements) && announcements.length > 0, true);
});

test('listing discord announcements works', async t => {
  const announcements = await client.announcements.list('discord');
  t.is(Array.isArray(announcements) && announcements.length > 0, true);
});
