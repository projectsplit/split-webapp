import { useEffect } from 'react';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { RiskItem } from './useActiveRisks';

/* ────────────────────────────────────────────────────────
 * Preset correlation map
 *
 * Keys use the canonical risk IDs from useActiveRisks.
 * Stored as "A::B" where A < B lexicographically so that
 * lookup is order-independent.
 * ──────────────────────────────────────────────────────── */
const pairKey = (a: string, b: string): string =>
  a < b ? `${a}::${b}` : `${b}::${a}`;

const PRESET_CORRELATIONS: Record<string, number> = {
  [pairKey('Equity', 'Career Loss')]: 0.5,
  [pairKey('Equity', 'Medical Bill')]: 0.05,
  [pairKey('Career Loss', 'Medical Bill')]: 0.1,
  [pairKey('Equity', 'FI Level')]: -0.5,
  [pairKey('Equity', 'FI Slope')]: -0.1,
  [pairKey('Equity', 'FI Curvature')]: 0.0,
  [pairKey('FI Level', 'Career Loss')]: -0.4,
  [pairKey('FI Level', 'Inflation Level')]: 0.4,
  [pairKey('FI Level', 'Inflation Slope')]: 0.0,
  [pairKey('FI Slope', 'Inflation Level')]: 0.1,
  [pairKey('FI Slope', 'Inflation Slope')]: 0.0,
  [pairKey('FI Curvature', 'Inflation Level')]: 0.0,
  [pairKey('FI Curvature', 'Inflation Slope')]: 0.0,
  [pairKey('Equity', 'Inflation Level')]: 0.15,
  [pairKey('Equity', 'Inflation Slope')]: 0.0,
  [pairKey('Equity', 'Property')]: 0.35,
  [pairKey('Property', 'Career Loss')]: 0.3,
  [pairKey('Property', 'FI Level')]: -0.25,
  [pairKey('Property', 'Inflation Level')]: -0.1,
  [pairKey('Expenses', 'Inflation Level')]: 0.6,
  [pairKey('Expenses', 'Inflation Slope')]: 0.1,
};

/** Look up the preset value for a pair; defaults to 0 for any undefined pair. */
const presetCorrelation = (a: string, b: string): number =>
  PRESET_CORRELATIONS[pairKey(a, b)] ?? 0;

export const readPair = (
  pairs: FinancialState['correlations']['pairs'],
  a: string,
  b: string
): number | undefined => pairs[a]?.[b] ?? pairs[b]?.[a];

export const useCorrelations = (
  setup: Signal<FinancialState>,
  items: RiskItem[]
) => {
  useEffect(() => {
    if (items.length < 2) return;
    const pairs = setup.value.correlations.pairs;
    const next: typeof pairs = {};
    let changed = false;

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i].id;
        const b = items[j].id;
        const existing = readPair(pairs, a, b);
        const value = existing ?? presetCorrelation(a, b);
        if (existing === undefined) changed = true;
        next[a] = { ...(next[a] ?? {}), [b]: value };
      }
    }

    if (!changed) return;

    setup.value = {
      ...setup.value,
      correlations: {
        pairs: mergePairs(pairs, next),
      },
    };
  }, [items, setup]);

  const setCorrelation = (a: string, b: string, value: number) => {
    const clamped = Math.max(-1, Math.min(1, value));
    const existing = setup.value.correlations.pairs;
    const [k1, k2] = existing[b]?.[a] !== undefined ? [b, a] : [a, b];
    setup.value = {
      ...setup.value,
      correlations: {
        pairs: {
          ...existing,
          [k1]: { ...(existing[k1] ?? {}), [k2]: clamped },
        },
      },
    };
  };

  return { setCorrelation };
};

const mergePairs = (
  base: FinancialState['correlations']['pairs'],
  seed: FinancialState['correlations']['pairs']
): FinancialState['correlations']['pairs'] => {
  const out: FinancialState['correlations']['pairs'] = { ...base };
  for (const key of Object.keys(seed)) {
    out[key] = { ...(out[key] ?? {}), ...seed[key] };
  }
  return out;
};
