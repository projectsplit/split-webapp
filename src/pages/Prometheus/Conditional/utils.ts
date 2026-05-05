const HIDDEN_FACTORS = new Set([
  'PC1_z',
  'PC2_z',
  'PC3_z',
  'infl_PC1_z',
  'infl_PC2_z',
]);

export const isVisibleFactor = (name: string): boolean =>
  !HIDDEN_FACTORS.has(name);

const DISPLAY_OVERRIDES: Record<string, string> = {
  bond_pnl: 'Bond P&L',
  equity_returns: 'Equity Returns',
  delta_y_bps: 'Yield Change (bps)',
  PC1_avg_bp: 'Rate Level (PC1)',
  PC2_slope_bp: 'Rate Slope (PC2)',
  PC3_curve_bp: 'Rate Curvature (PC3)',
  infl_1yr_level: 'Inflation Level (1yr)',
  infl_slope: 'Inflation Slope',
  net_salary: 'Net Salary',
  bond_value: 'Bond Portfolio Value',
  equity_value: 'Equity Portfolio Value',
};

export const formatFactorName = (raw: string): string => {
  if (DISPLAY_OVERRIDES[raw]) return DISPLAY_OVERRIDES[raw];
  return raw
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const EQUITY_MAX_CAP = 1.0;

export const getClampedMax = (factorName: string, max: number): number => {
  if (factorName === 'equity_returns' && max > EQUITY_MAX_CAP) {
    return EQUITY_MAX_CAP;
  }
  return max;
};
