export const formatSimCurrency = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPercent = (decimal: number): string => {
  const pct = decimal * 100;
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
};

export const formatBps = (bps: number): string => {
  const sign = bps >= 0 ? '+' : '';
  return `${sign}${bps.toFixed(0)}bps`;
};
