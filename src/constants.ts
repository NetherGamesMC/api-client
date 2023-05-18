/**
 * The base URL for the CDN.
 */
export const CDN_HOST = 'https://cdn.nethergames.org'

/**
 * The MD5 hash of the default skin (Steve).
 */
export const DEFAULT_SKIN_HASH = 'def463341f256af9656a2eebea910968'

export const LEADERBOARD_COLUMNS = [
  'bw_beds_broken',
  'bw_doubles_beds_broken',
  'bw_doubles_final_kills',
  'bw_doubles_kills',
  'bw_doubles_wins',
  'bw_final_kills',
  'bw_kills',
  'bw_solo_beds_broken',
  'bw_solo_final_kills',
  'bw_solo_kills',
  'bw_solo_wins',
  'bw_squads_beds_broken',
  'bw_squads_final_kills',
  'bw_squads_kills',
  'bw_squads_wins',
  'bw_trios_beds_broken',
  'bw_trios_final_kills',
  'bw_trios_kills',
  'bw_trios_wins',
  'bw_wins',
  'cq_flags_captured',
  'cq_kills',
  'cq_wins',
  'duels_kills',
  'duels_wins',
  'kills',
  'mm_bow_kills',
  'mm_classic_kills',
  'mm_classic_wins',
  'mm_infection_kills',
  'mm_infection_wins',
  'mm_kills',
  'mm_knife_kills',
  'mm_throw_knife_kills',
  'mm_wins',
  'ms_wins',
  'sc_wins',
  'sg_kills',
  'sg_wins',
  'sw_doubles_insane_kills',
  'sw_doubles_kills',
  'sw_doubles_normal_kills',
  'sw_doubles_wins',
  'sw_kills',
  'sw_solo_insane_kills',
  'sw_solo_kills',
  'sw_solo_normal_kills',
  'sw_solo_wins',
  'sw_wins',
  'tb_kills',
  'tb_wins',
  'uhc_kills',
  'uhc_wins',
  'wins',
] as const

export const LEADERBOARD_COLUMNS_NESTED = {
  total: {kills: {}, wins: {}, total: {kills: {}, wins: {}}},
  cq: {total: {kills: {}, wins: {}, flags_captured: {}}},
  duels: {total: {kills: {}, wins: {}}},
  ms: {total: {wins: {}}},
  sc: {total: {wins: {}}},
  sg: {total: {kills: {}, wins: {}}},
  tb: {total: {kills: {}, wins: {}}},
  uhc: {total: {kills: {}, wins: {}}},
  bw: {
    total: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    doubles: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    solo: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    squads: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
    trios: {kills: {}, wins: {}, beds_broken: {}, final_kills: {}},
  },
  mm: {
    total: {kills: {}, wins: {}, bow_kills: {}, knife_kills: {}, throw_knife_kills: {}},
    classic: {kills: {}, wins: {}},
    infection: {kills: {}, wins: {}},
  },
  sw: {
    total: {kills: {}, wins: {}},
    doubles: {kills: {}, wins: {}, insane_kills: {}, normal_kills: {}},
    solo: {kills: {}, wins: {}, insane_kills: {}, normal_kills: {}},
  },
} as const

export const POSSIBLE_SUBTYPES = new Set([
  'kills',
  'wins',
  'flags_captured',
  'beds_broken',
  'final_kills',
  'insane_kills',
  'normal_kills',
])
