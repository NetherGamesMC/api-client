import test from 'ava'

import {parseLeaderboardColumn} from '../utils.js'

test('parseLeaderboardColumn', t => {
  t.deepEqual(parseLeaderboardColumn(), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn(null), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', 'total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', null), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn(null, 'total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', 'total', 'total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', 'total', null), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', null, 'total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn(null, 'total', 'total'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('bh'), {success: false, values: {total: ['wins']}})
  t.deepEqual(parseLeaderboardColumn('cq'), {success: false, values: {total: ['kills', 'wins', 'flags_captured']}})
  t.deepEqual(parseLeaderboardColumn('duels'), {success: false, values: {total: ['kills', 'wins']}})
  t.deepEqual(parseLeaderboardColumn('total', 'total', 'wins'), {success: true, column: 'wins'})
})
