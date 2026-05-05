export interface ReweightRequest {
  equity: number;
  bond: number;
  total?: number;
}

export interface WhatIfRequest {
  buffer_delta: number;
  expense_cut: number;
  salary_delta: number;
  reweight?: ReweightRequest;
  disabled_risks: Record<string, number>;
  risk_caps: Record<string, number[]>;
  exclude_property: boolean;
}

export interface WhatIfSummary {
  p_bust: number;
  bust_count: number;
  mean: number;
  median: number;
  p5: number;
  p25: number;
  p75: number;
  p95: number;
  n_sims: number;
}

export interface WhatIfDelta {
  delta_p_bust: number;
  delta_mean: number;
  delta_median: number;
  delta_p5: number;
  delta_p95: number;
}

export interface WhatIfNarrative {
  headline: string;
  scenario: string[];
  impact: string[];
  summary: string;
}

export interface WhatIfResponse {
  run_id: string;
  baseline: WhatIfSummary;
  scenario: WhatIfSummary;
  delta: WhatIfDelta;
  narrative: WhatIfNarrative;
}

export interface FactorStats {
  min: number;
  p01: number;
  p50: number;
  p99: number;
  max: number;
  mean: number;
  std: number;
}

export interface RiskStats extends FactorStats {
  fair_premium: {
    full: number;
    caps: { max_loss: number; premium: number }[];
    basis: 'loss' | 'gross';
  };
}

export interface FactorsResponse {
  run_id: string;
  risks: Record<string, RiskStats>;
  factors: Record<string, FactorStats>;
}

export interface FairPremiumRequest {
  risk_name: string;
  max_loss: number;
}

export interface FairPremiumResponse {
  risk_name: string;
  max_loss: number | null;
  premium: number;
  basis: 'loss' | 'gross';
}
