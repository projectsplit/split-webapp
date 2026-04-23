import { useEffect } from 'react';
import { Signal } from '@preact/signals-react';
import { FinancialState } from '@/pages/Prometheus/interfaces';
import { RiskItem } from './useActiveRisks';

const randomCorrelation = (): number => {
  const raw = Math.random() * 1.6 - 0.8;
  return Math.round(raw * 100) / 100;
};

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
        const value = existing ?? randomCorrelation();
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
