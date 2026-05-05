import { formatSimCurrency } from '../Simulation/utils/formatCurrency';

export const formatCompact = (value: number): string => {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

export const formatDelta = (value: number): string => {
  if (value === 0) return '$0';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatCompact(value)}`;
};

export const formatDeltaMonthly = (value: number): string => {
  return `${formatDelta(value)}/yr`;
};

export const formatPp = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(4)}pp`;
};

export { formatSimCurrency, formatCompact as formatBound };
