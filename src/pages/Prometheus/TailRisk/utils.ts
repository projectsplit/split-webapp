import { isRateFactor } from '@/pages/Prometheus/Conditional/utils';
import { getFactorUnit, FactorUnit } from '@/pages/Prometheus/ThresholdSensitivity/utils';

export const formatTailValue = (
  val: number,
  factor: string,
  currency: string = 'USD',
): string => {
  const unit: FactorUnit = getFactorUnit(factor);
  const symbol = currencySymbol(currency);

  switch (unit) {
    case 'return':
      return `${(val * 100).toFixed(1)}%`;
    case 'percent':
      return `${val.toFixed(2)}%`;
    case 'bps':
      return `${Math.round(val)} bps`;
    case 'money': {
      const abs = Math.abs(val);
      const sign = val < 0 ? '-' : '';
      if (abs >= 1_000_000)
        return `${sign}${symbol}${(abs / 1_000_000).toFixed(1)}M`;
      if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(1)}K`;
      return `${sign}${symbol}${abs.toLocaleString('en-US', {
        maximumFractionDigits: 0,
      })}`;
    }
  }
};

export const formatPct = (val: number, digits: number = 4): string =>
  `${val.toFixed(digits)}%`;

export const formatPpDelta = (val: number, digits: number = 4): string => {
  const sign = val >= 0 ? '+' : '';
  return `${sign}${val.toFixed(digits)}pp`;
};

export const currencySymbol = (currency: string): string => {
  const upper = (currency || 'USD').toUpperCase();
  if (upper === 'EUR') return '€';
  if (upper === 'GBP') return '£';
  if (upper === 'JPY') return '¥';
  return '$';
};

export interface ConcentrationTier {
  label: string;
  color: string;
}

export const concentrationTier = (absZ: number): ConcentrationTier => {
  if (absZ >= 3) return { label: 'severe', color: '#ef4444' };
  if (absZ >= 1.5) return { label: 'strong', color: '#fbbf24' };
  if (absZ >= 0.5) return { label: 'mild', color: '#4ae176' };
  return { label: 'none', color: '#968e99' };
};

export const directionLabel = (
  factor: string,
  direction: 'low' | 'high',
): string => {
  const unit = getFactorUnit(factor);
  if (unit === 'money') return direction === 'high' ? 'HIGH' : 'LOW';
  return direction === 'high' ? 'UP' : 'DOWN';
};

export { isRateFactor };
