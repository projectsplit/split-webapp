import { Frequency, SpendingChartsResponse } from '../types';

type SpendingSummary = {
  spentSoFar: number;
  dailyAverage: number;
  forecast: number;
  busiestLabel: string | null;
  busiestAmount: number;
};

const cycleLength = (cycle: Frequency, startDate: string): number => {
  const start = new Date(startDate);
  if (!Number.isFinite(start.getTime())) return 0;

  switch (cycle) {
    case Frequency.Weekly:
      return 7;
    case Frequency.Annually:
      return 12;
    case Frequency.Monthly:
    default:
      return new Date(
        start.getFullYear(),
        start.getMonth() + 1,
        0
      ).getDate();
  }
};

export const getSpendingSummary = (
  data: SpendingChartsResponse | undefined,
  startDate: string,
  cycle: Frequency
): SpendingSummary | null => {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

  const spentSoFar = items.reduce(
    (max, i) => Math.max(max, i.accumulativeShareAmount ?? 0),
    0
  );

  const lastWithSpend = items.reduce(
    (last, i, index) => ((i.shareAmount ?? 0) !== 0 ? index : last),
    -1
  );
  const elapsed = lastWithSpend >= 0 ? lastWithSpend + 1 : 0;
  const dailyAverage = elapsed > 0 ? spentSoFar / elapsed : 0;

  const periodLength = Math.max(cycleLength(cycle, startDate), items.length);
  const forecast = dailyAverage * periodLength;

  const busiest = items.reduce(
    (best, i) => ((i.shareAmount ?? 0) > (best?.shareAmount ?? 0) ? i : best),
    items[0]
  );
  const busiestDate = busiest?.from ? new Date(busiest.from) : null;

  return {
    spentSoFar,
    dailyAverage,
    forecast,
    busiestLabel:
      busiestDate && Number.isFinite(busiestDate.getTime())
        ? `${busiestDate.toLocaleDateString(undefined, { weekday: 'short' })} ${busiestDate.getDate()}`
        : null,
    busiestAmount: busiest?.shareAmount ?? 0,
  };
};
