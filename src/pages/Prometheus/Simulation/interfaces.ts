export interface SimulationScenario {
  percentile: number;
  wealth: number;
  equity_return: number;
  portfolio_end: number;
  bond_portfolio_end:number;
  career_severance:number;
  severance_cash:number;
  salary_cash: number;
  income: number;
  expenses: number;
  bond_pnl: number;
  delta_y_bps: number;
  delta_infl_1yr: number;
  property_return: number | null;
  property_end: number | null;
  [key: string]: number | null;
}

export interface SimulationSummary {
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  prob_negative: number;
  percentiles: Record<string, number>;
}

export interface SimulationEconomy {
  requested: string;
  resolved_yields: string;
  resolved_inflation: string;
  resolved_property: string | null;
}

export interface SimulationResponse {
  run_id: string;
  starting_wealth:number;
  economy: SimulationEconomy;
  summary: SimulationSummary;
  scenarios: SimulationScenario[];
  n_sims: number;
  realized_correlation: number;
}
