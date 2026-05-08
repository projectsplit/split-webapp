export interface TailDriversRequest {
  exclude_property?: boolean;
  tail_threshold_busts?: number;
  tail_fallback_pct?: number;
  pair_quantile?: number;
  pair_top_n?: number;
  path_depth?: number;
  path_top_n?: number;
}

export type TailArchetype =
  | 'single_driver'
  | 'combination'
  | 'additive_multi'
  | 'diffuse'
  | 'mixed'
  | 'no_tail';

export type FactorDirection = 'low' | 'high';

export interface ZScoreRow {
  factor: string;
  direction: FactorDirection;
  mean_full: number;
  std_full: number;
  mean_tail: number;
  z: number;
  abs_z: number;
}

export type PairCellKey = 'neither' | 'a_only' | 'b_only' | 'both';

export interface PairCell {
  n: number;
  p_bust: number;
}

export interface PairRow {
  factor_a: string;
  direction_a: FactorDirection;
  thresh_a: number;
  factor_b: string;
  direction_b: FactorDirection;
  thresh_b: number;
  q: number;
  p_baseline: number;
  p_a_alone: number;
  p_b_alone: number;
  p_joint: number;
  expected_indep: number;
  interaction_excess: number;
  joint_excess: number;
  cells: Record<PairCellKey, PairCell>;
}

export type PathwayRule = [factor: string, op: '<=' | '>', threshold: number];

export interface PathwayLeaf {
  rules: PathwayRule[];
  n_paths: number;
  n_busts: number;
  bust_rate: number;
  lift_vs_baseline: number;
}

export interface PathwaysResult {
  available: boolean;
  reason?: string;
  depth?: number;
  min_samples_leaf?: number;
  n_busts?: number;
  p_baseline?: number;
  n_leaves?: number;
  leaves: PathwayLeaf[];
}

export interface NarrativeSections {
  headline: string;
  portrait: string[];
  diagnosis: string[];
  pairs: string[];
  pathways: string[];
}

export interface TailDriversResponse {
  run_id: string;
  tail_label: string;
  baseline_p_bust: number;
  archetype: TailArchetype;
  factors: Record<string, FactorDirection>;
  zscores: ZScoreRow[];
  pairs: PairRow[];
  pathways: PathwaysResult;
  narrative: NarrativeSections;
}

export const ARCHETYPE_LABELS: Record<TailArchetype, string> = {
  single_driver: 'Single Driver',
  combination: 'Combination Risk',
  additive_multi: 'Additive Multi-Factor',
  diffuse: 'Diffuse Tail',
  mixed: 'Mixed Drivers',
  no_tail: 'No Material Tail',
};

export const DEFAULT_TAIL_REQUEST: Required<TailDriversRequest> = {
  exclude_property: false,
  tail_threshold_busts: 50,
  tail_fallback_pct: 0.5,
  pair_quantile: 0.25,
  pair_top_n: 10,
  path_depth: 3,
  path_top_n: 5,
};
