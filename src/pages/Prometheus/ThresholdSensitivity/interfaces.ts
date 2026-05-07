export type SweepOp = 'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne';

export const SWEEP_OP_LABELS: Record<SweepOp, string> = {
  lt: '<',
  le: '≤',
  eq: '=',
  ge: '≥',
  gt: '>',
  ne: '≠',
};

export const SWEEP_OP_ORDER: SweepOp[] = ['lt', 'le', 'eq', 'ge', 'gt'];

export interface ConditionalSweepRequest {
  factor: string;
  op: SweepOp;
  thresholds?: number[];
  auto_quantiles?: number[];
}

export type SweepReliability = 'reliable' | 'wide_ci' | 'insufficient';

export interface SweepRow {
  condition: string;
  n_total: number;
  n_subset: number;
  frac_subset: number;
  n_busts_total: number;
  n_busts_in_subset: number;
  frac_busts: number;
  p_bust: number | null;
  p_bust_ci_low: number | null;
  p_bust_ci_high: number | null;
  baseline_p_bust: number;
  lift: number | null;
  reliability: SweepReliability;
}

interface SweepNarrative {
  header:     string[];
  body:       string[];
  conclusion: string[];
}

export interface ConditionalSweepResponse {
  run_id: string;
  factor: string;
  op: string;
  thresholds: number[];
  rows: SweepRow[];
  narrative: SweepNarrative;
  factor_explanations: Record<string, string[]>;
}
