export interface FactorMeta {
  key: string;
  label: string;
  description: string;
}

export const MAIN_FACTORS: FactorMeta[] = [
  { key: 'equity_returns', label: 'Equity Returns', description: 'Annual return on your equity portfolio.' },
  { key: 'PC1_avg_bp', label: 'Interest Rate Level', description: 'Parallel shift in rates across all maturities. Rising rates cause bond losses; falling rates cause bond gains.' },
  { key: 'PC2_slope_bp', label: 'Yield Curve Slope', description: 'How much the long end moves relative to the short end. Positive = steepening, negative = flattening or inversion.' },
  { key: 'infl_1yr_level', label: 'Inflation Level (1yr)', description: 'Annualised inflation rate over the year. Higher inflation increases your living expenses.' },
  { key: 'income', label: 'Net Annual Income', description: 'Your net salary after tax.' },
  { key: 'expenses', label: 'Living Expenses', description: 'Total annual expenses including the inflation adjustment.' },
  { key: 'portfolio_end', label: 'Equity Portfolio Value', description: 'End-of-year value of your equity holdings.' },
  { key: 'bond_portfolio_end', label: 'Bond Portfolio Value', description: 'End-of-year value of your bond holdings, after yield-driven P&L.' },
  { key: 'bond_pnl', label: 'Bond P&L', description: 'Mark-to-market gain or loss on bonds from all yield curve movements.' },
  { key: 'delta_y_bps', label: 'Bond Yield Change', description: "Change in yield at your bond's maturity. This is what drives your Bond P&L." },
  { key: 'property_end', label: 'Property Value', description: 'End-of-year value of your property holdings.' },
];

export const ADVANCED_FACTORS: FactorMeta[] = [
  { key: 'PC1_z', label: 'Rate Level (z-score)', description: 'Raw PC1 score in standard deviations. Use Interest Rate Level (bp) for a more intuitive version.' },
  { key: 'PC2_z', label: 'Rate Slope (z-score)', description: 'Raw PC2 score in standard deviations. Use Yield Curve Slope (bp) for a more intuitive version.' },
  { key: 'PC3_z', label: 'Rate Curvature (z-score)', description: 'Raw PC3 score. Captures the butterfly shape — whether the belly of the curve moves differently from the wings.' },
  { key: 'delta_infl_1yr', label: 'Inflation Change (1yr)', description: 'Change in 1yr inflation expectations in percentage points. Inflation Level = spot rate + this change.' },
  { key: 'InfPC1_z', label: 'Inflation Level (z-score)', description: 'Raw inflation PC1 in standard deviations. Drives the overall level of inflation expectations.' },
  { key: 'InfPC2_z', label: 'Inflation Slope (z-score)', description: 'Raw inflation PC2 in standard deviations. Drives the tilt between short and long-term inflation expectations.' },
  { key: 'expenses_base', label: 'Living Expenses (pre-inflation)', description: 'Expenses before the inflation adjustment. Expenses = this × (1 + inflation / 100).' },
  { key: 'property_return', label: 'Property Total Return', description: 'Total return on property including both the excess return and the risk-free rate component.' },
  { key: 'property_excess', label: 'Property Excess Return', description: 'Property return above the risk-free rate. Calibrated from the property distribution.' },
  { key: 'property_rfr', label: 'Property Risk-Free Rate', description: 'Risk-free rate component of property return, derived from the yield curve model.' },
  { key: 'career_severance', label: 'Career Severance', description: 'Severance payment received on career loss. Offsets part of the gross income loss.' },
  { key: 'career_gross', label: 'Career Gross Loss', description: 'Gross income lost in a career loss event, before severance offset.' },
];

const ALL_CATALOG = new Map<string, FactorMeta>();
for (const f of [...MAIN_FACTORS, ...ADVANCED_FACTORS]) {
  ALL_CATALOG.set(f.key, f);
}

export const formatFactorName = (raw: string, bondTenor?: number): string => {
  if (raw === 'delta_y_bps') {
    const tenor = bondTenor ?? 10;
    return `Yield Change on the ${tenor} Year Tenor`;
  }
  const meta = ALL_CATALOG.get(raw);
  if (meta) return meta.label;
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

const YIELDS_FACTORS = new Set([
  'PC1_avg_bp', 'PC2_slope_bp', 'delta_y_bps', 'bond_pnl',
  'bond_portfolio_end', 'PC1_z', 'PC2_z', 'PC3_z',
]);

const PROPERTY_FACTORS = new Set([
  'property_end', 'property_return', 'property_excess', 'property_rfr',
]);

const INFLATION_FACTORS = new Set([
  'infl_1yr_level', 'delta_infl_1yr', 'InfPC1_z', 'InfPC2_z', 'expenses_base',
]);

export interface RiskVisibility {
  yields: boolean;
  property: boolean;
  inflation: boolean;
}

export const isFactorVisible = (
  key: string,
  toggles: RiskVisibility,
): boolean => {
  if (!toggles.yields && YIELDS_FACTORS.has(key)) return false;
  if (!toggles.property && PROPERTY_FACTORS.has(key)) return false;
  if (!toggles.inflation && INFLATION_FACTORS.has(key)) return false;
  return true;
};

export const getFactorLabel = (meta: FactorMeta, bondTenor: number): string => {
  if (meta.key === 'delta_y_bps') {
    return `Bond Yield Change at ${bondTenor}Y Tenor`;
  }
  return meta.label;
};
