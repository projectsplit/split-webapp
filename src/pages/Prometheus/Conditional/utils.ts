const HIDDEN_FACTORS = new Set([
  'PC1_z',
  'PC2_z',
  'PC3_z',
  'infl_PC1_z',
  'infl_PC2_z',
  'InfPC2_z',
  'InfPC1_z',
  'expenses_base',
  'delta_infl_1yr',
]);

export const isVisibleFactor = (name: string): boolean =>
  !HIDDEN_FACTORS.has(name);

const DISPLAY_OVERRIDES: Record<string, string> = {
  savings: 'Cash Savings',
  portfolio_end: 'Equity Portfolio Value',
  equity_returns: 'Equity Returns',
  income: 'Net Annual Income',
  expenses: 'Living Expenses',
  expenses_base: 'Living Expenses (pre-inflation)',
  career_severance: 'Career Severance',
  career_gross: 'Career Gross Loss',
  property_end: 'Property Value',
  property_return: 'Property Total Return',
  property_excess: 'Property Excess Return',
  property_rfr: 'Property Risk-Free Rate',
  bond_portfolio_end: 'Bond Portfolio Value',
  bond_pnl: 'Bond P&L',
  delta_y_bps: 'Avg. Yield Change (bp)',
  PC1_avg_bp: 'Interest Rates Level',
  PC2_slope_bp: 'Yield Curve Slope',
  PC1_z: 'Rate Level (z-score)',
  PC2_z: 'Rate Slope (z-score)',
  PC3_z: 'Rate Curvature (z-score)',
  infl_1yr_level: 'Inflation Level (1yr)',
  delta_infl_1yr: 'Inflation Change (1yr)',
  InfPC1_z: 'Inflation Level (z-score)',
  InfPC2_z: 'Inflation Slope (z-score)',
};

export const formatFactorName = (raw: string, bondTenor?: number): string => {
  if (raw === 'delta_y_bps') {
    const tenor = bondTenor ?? 10;
    return `Yield Change on the ${tenor} Year Tenor`;
  }
  if (DISPLAY_OVERRIDES[raw]) return DISPLAY_OVERRIDES[raw];
  return raw
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const RATE_FACTORS = new Set([
  'equity_returns',
  'property_return',
  'property_excess',
  'property_rfr',
  'infl_1yr_level',
  'infl_slope',
]);

export const isRateFactor = (name: string): boolean => RATE_FACTORS.has(name);

export const formatFactorValue = (val: number, factorName: string): string => {
  if (isRateFactor(factorName)) return `${(val * 100).toFixed(1)}%`;
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (Math.abs(val) >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return val.toFixed(1);
};

const EQUITY_MAX_CAP = 1.0;

export const getClampedMax = (factorName: string, max: number): number => {
  if (factorName === 'equity_returns' && max > EQUITY_MAX_CAP) {
    return EQUITY_MAX_CAP;
  }
  return max;
};
