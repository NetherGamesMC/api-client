import test from 'ava';
import {NetherGamesClient} from '../client.js';
import {NetherGamesRequestError} from '../errors.js';
import {RANDOM_PLAYERS} from './_data.js';

const client = new NetherGamesClient('testing');

test('retrieving an existing player works', async t => {
  const player = await client.players.retrieve('NetherGamesMC');
  t.is(player!.name, 'NetherGamesMC');
});

test('retrieving multiple players works', async t => {
  const players = await client.players.search(RANDOM_PLAYERS.slice(0, 5));
  t.is(players.length, 5);
});

test('retrieving a missing player works', async t => {
  const player = await client.players.retrieve('this player does not exist');
  t.is(player, null);
});

test('retrieving too many players fails', async t => {
  await t.throwsAsync(() => client.players.search([...RANDOM_PLAYERS, 'NetherGamesMC']), {
    instanceOf: NetherGamesRequestError,
  });
});

test('retrieving a player leaderboard works', async t => {
  await t.notThrowsAsync(() => client.players.leaderboard('NetherGamesMC'));
});

test('retrieving multiple player leaderboards works', async t => {
  await t.notThrowsAsync(() => client.players.leaderboardBulk(RANDOM_PLAYERS.slice(0, 5)));
});

test('retrieving a player avatar works', async t => {
  const avatar = await client.players.avatar('NetherGamesMC');
  t.deepEqual(avatar, {
    skin: false,
    skinType: 'steve',
    skinVisibility: false,
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABf0lEQVRoge3Vv0sCYRgHcMcwShKCkFIHi7gTDLQhwpSTaokGD5cIg4IiUYQjEhLBHw0eweXkdFPjUVOWg5xj/5b9A99nuJfavi+f8e49Hp7n+V4ok1yB9DiWSUSg3c1lKLWxBO3EwpD0XW0LC7GACDsQ5gglucQJplBMNUalF4LKptYgQ4tCBW0dSsdXIek/wwLi7IDGEdK5xDpTqPDnMfpt1yHfsaCfcRfyXyzMeYDeHy+g3HYUYgEOO+BwhHQusc8U8pVj1OvcQpPnBiQ9/9FtQK51Cc1sC3LvzwJhAR12wOYIeVxijyk0U45RKe8XwinnbeirfQdJeS/dsxCO9P9hAXl2IM8RmnCJy0yhsnKMujcn0Gf7Gpr2LahW3AtkPqxDb7VTqGvmIBbQZweGHCGXSzxlCs2VY3RULUHjqyLUMvb/1Wv1COqZBxALMNgBgyM04hK3mEIt5RhtHqehRkmDpIskT+dZaFA5DES6hwWY7ECFI9TkEveYQgPVGP0Fx856wGsMLdcAAAAASUVORK5CYII=',
    raw: null,
  });
});

test('retrieving a player skin works', async t => {
  const skin = await client.players.skin('NetherGamesMC');
  t.deepEqual(skin, {
    skin: false,
    skinType: 'steve',
    skinVisibility: false,
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA67AAAOuwHH+NQ2AAAEv0lEQVR4nO2aX0sVQRjGt4wuhMg4V2IhRh7qItpCMzU5pWEY/SENEc5NRKChRBQURGZ1I4LSlYQ3XgTBiYqK6rJv4EfpC3Q18Yz7bs+Os7NHz589HnfgYdbZ2Tnz/Gbm3cUZTynludTRtk9BbQc9xddQa4unnlzucer30Aln+6knVQYAmO3MtWgxAEiMPhj0te6cOxXmTQOgMzCfa/WsAGD2wvFjETUNgLZg9M1lIGVND6CDzGIGQLwc9gSADot5BnD9dHdzA8gFxuUa0d+cATY15QzIBZLyXf8azFmMnWxvDad5V+5AGPRwH4GQAUg9PMOg2g9tKuk7ouEAdAZTm02JAONM52EtqcfGBZIJwPUdkbZ/D53CSMio8loX498fTakfL+6pX4sPw/zL3ERonmeFAODXp+s7Im3/noyUdNL8G+Z/vrwfQoBx5J+mr2uxOX5L2EDYviMaBkB7IMyGlRuD6vP0Ld1JmP/7948aH1oKIeAaZfgbdVB39fZQOBPMmOL6jmgoAK0tnjp6ZL9aGO7REJaunlerE5fUx+lb2vibqxe0cA3Tz0d61dJYnzaPazyLdmxvi7jviLT9ewhs6DRyjLYezRuDGsKrkR61fK1fQ3g23BsRjMP0k+EenS+O9av3UyN6VpgB1fUdkbZ/D0YhdB45zK8QANHbmxe1Xo/2aSjQ0+FNAPI8VLp7LcylbdQxl4Y85zVamhzbUKxCoRBRYgMbG2r5ylmrcC/fVXQqsf1SSbejVSrpduf7u8O8IQDM93dbVRUAYj7Q3gNQohkQ/BZD2HNLYL5SAP7JxwrCjyMfHfgQEd+DBs4uRe57Cwv/VSwqb21NeevrOhB+mxsPgyPKtLg+hDKYEn39uin526wvdZDb2pPnRdUCkI+5r390ZmZT0sGgcxHz0iGuD7FpFgPg9qUtec5srxYAfMf9yI/zCMgIYUawSa5v67AJwQSwnft1AVAs/u8ArvnHBQCXxdWXejDF13EzQNqvBoA8rfEkAIgBrNCICJ1n03It5VxXAJim6XlZRhCCHD7DWSjjOub9sgHkaYTFXFkA2AxgMACbMQYmS8D2TLBsbAAQXMWglFcEwK80BpgAePQ5ajMAjgGGaQbC5kwA8pYxAaBc6lQNgB+zRLaswSQAcVG7DADmCJsAbEukbAB+QgwoGwAHIPMNYAKwBS1DbC4OgCtGJAIoBF94SQCk3uzsbEShIfkQkdEzRz8OANe3xAM2Z1vjDICXgORlAyjEGEy6z8sHuQlQgioDiAu64TJZWwuDcBwAMWmbIakB8C0zKAIhMBZXX+pwmTnCbA4S4+9uDu4MQJaylKUsZSlLWcpSlrKUpSxlKUtZylLqm6vV3vysd5qswu5yTbe/dxWAUg1OgOy2JbDc6AD8bZ4v2PJP0LjzArw5Wsn+fz0A5B3nB5L+a2zdXhcA1dj9rRcA37Gx4gRgO2DBBvccgPUq7/83AgDfsb1e8/3/NAAMGOcLOEbEAUja+tpVAEa3sQRMALytZQLg8wFl7//XA4CfsL3uAmBubvLpD3P3d0fb340AwHfcN6e4DUBFByBqnQoVni+w7e/HAbAtkbT9e5Vur9tG2HUIqikBvKc1zgHOPAJTCwD/AA9M6t9RRIwiAAAAAElFTkSuQmCC',
    raw: null,
  });
});

test('retrieving usernames by xuids works', async t => {
  const usernames = await client.players.usernamesByXuids(['2535418039503959']);
  t.deepEqual(usernames, {'2535418039503959': 'NetherGamesMC'});
});
