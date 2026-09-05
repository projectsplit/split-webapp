import { SpendingChartsResponse } from '../../../types';

export const getTotalLentBorrowed = (
  backendData: SpendingChartsResponse | undefined
): { totalLent: number[]; totalBorrowed: number[] } => {
  const items = backendData?.items;

  if (!items?.length) return { totalLent: [], totalBorrowed: [] };

  // The backend classifies each expense as lent or borrowed and accumulates in decimal, so the
  // running totals are read straight off the items rather than re-derived from a net difference.
  const last = items[items.length - 1];

  // No money moved in either direction over the period, so let the noData plugin take over
  // instead of drawing two flat lines along zero.
  if (last.accumulativeLentAmount === 0 && last.accumulativeBorrowedAmount === 0)
    return { totalLent: [], totalBorrowed: [] };

  return {
    totalLent: items.map((x) => x.accumulativeLentAmount),
    totalBorrowed: items.map((x) => x.accumulativeBorrowedAmount),
  };
};
