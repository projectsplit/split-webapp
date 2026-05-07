import { FactorStats } from '@/pages/Prometheus/WhatIf/interfaces';
import {
  isRateFactor,
  formatFactorValue,
} from '@/pages/Prometheus/Conditional/utils';

const BPS_FACTORS = new Set([
  'PC1_avg_bp',
  'PC2_slope_bp',
  'delta_y_bps',
]);

const PERCENT_FACTORS = new Set([
  'infl_1yr_level',
  'delta_infl_1yr',
]);

export type FactorUnit = 'return' | 'bps' | 'percent' | 'money';

export const getFactorUnit = (factorName: string): FactorUnit => {
  if (isRateFactor(factorName)) return 'return';
  if (BPS_FACTORS.has(factorName)) return 'bps';
  if (PERCENT_FACTORS.has(factorName)) return 'percent';
  return 'money';
};

export const getUnitLabel = (unit: FactorUnit): string => {
  switch (unit) {
    case 'return':
      return '%';
    case 'bps':
      return 'bps';
    case 'percent':
      return '%';
    case 'money':
      return '';
  }
};

export const formatThresholdDisplay = (val: number, factorName: string): string => {
  return formatFactorValue(val, factorName);
};

export const parseThresholdInput = (
  raw: string,
  factorName: string,
): number | null => {
  const num = parseFloat(raw);
  if (isNaN(num)) return null;
  if (isRateFactor(factorName)) return num / 100;
  return num;
};

export const toInputDisplay = (val: number, factorName: string): string => {
  if (isRateFactor(factorName)) return (val * 100).toFixed(1);
  if (PERCENT_FACTORS.has(factorName)) return val.toFixed(2);
  if (BPS_FACTORS.has(factorName)) return val.toFixed(0);
  if (Math.abs(val) >= 1_000_000) return (val / 1_000_000).toFixed(1);
  if (Math.abs(val) >= 1_000) return (val / 1_000).toFixed(1);
  return val.toFixed(0);
};

export const generateDefaultThresholds = (
  stats: FactorStats,
  factorName: string,
  count: number = 6,
): number[] => {
  const lo = stats.p01;
  const hi = stats.p99;

  if (lo === hi) return [lo];

  const step = (hi - lo) / (count - 1);
  const thresholds: number[] = [];
  for (let i = 0; i < count; i++) {
    let val = lo + step * i;
    if (isRateFactor(factorName)) {
      val = Math.round(val * 1000) / 1000;
    } else if (BPS_FACTORS.has(factorName)) {
      val = Math.round(val);
    } else if (PERCENT_FACTORS.has(factorName)) {
      val = Math.round(val * 100) / 100;
    } else {
      val = Math.round(val);
    }
    thresholds.push(val);
  }

  return [...new Set(thresholds)].sort((a, b) => a - b);
};
