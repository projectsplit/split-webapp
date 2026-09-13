import { SpendingChartsResponse } from '../../../types';

export const getTotalLentBorrowed = (
  backendData: SpendingChartsResponse | undefined
): { totalLent: number[]; totalBorrowed: number[] } => {
  const items = backendData?.items;

  if (!items?.length) return { totalLent: [], totalBorrowed: [] };

  const last = items[items.length - 1];

  if (last.accumulativeLentAmount === 0 && last.accumulativeBorrowedAmount === 0)
    return { totalLent: [], totalBorrowed: [] };

  return {
    totalLent: items.map((x) => x.accumulativeLentAmount),
    totalBorrowed: items.map((x) => x.accumulativeBorrowedAmount),
  };
};
