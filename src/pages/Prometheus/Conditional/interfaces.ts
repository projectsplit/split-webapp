export interface Condition {
  factor: string;
  op: 'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne';
  value: number;
}

export interface ConditionalQueryRequest {
  conditions: Condition[];
}

export interface ConditionalQueryResponse {
  run_id: string;
  condition: string;
  n_total: number;
  n_subset: number;
  frac_subset: number;
  n_busts_total: number;
  n_busts_in_subset: number;
  frac_busts: number;
  p_bust: number | null;
  baseline_p_bust: number;
  lift: number | null;
  narrative: string[];
  factor_explanations: Record<string, string[]>;
}

export type OpType = 'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne';

export const OP_LABELS: Record<OpType, string> = {
  lt: '<',
  le: '≤',
  eq: '=',
  ge: '≥',
  gt: '>',
  ne: '≠',
};

export const OP_ORDER: OpType[] = ['lt', 'le', 'eq', 'ge', 'gt'];
