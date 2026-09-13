import { Frequency, SpendingChartsResponse } from '../types';

type SpendingSummary = {
  spentSoFar: number;
  dailyAverage: number;
  forecast: number;
  busiestLabel: string | null;
  busiestAmount: number;
};

const cycleLength = (
  cycle: Frequency,
  startDate: string,
  weekLength: number
): number => {
  const start = new Date(`${startDate}T00:00:00`);
  if (!Number.isFinite(start.getTime())) return 0;

  switch (cycle) {
    case Frequency.Weekly:
      return weekLength;
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
  cycle: Frequency,
  weekLength: number
): SpendingSummary | null => {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

  const spentSoFar = items.reduce(
    (max, i) => Math.max(max, i.accumulativeShareAmount ?? 0),
    0
  );

  const now = Date.now();
  const bucketsElapsed = items.filter(
    (i) => new Date(i.from).getTime() <= now
  ).length;
  const dailyAverage = bucketsElapsed > 0 ? spentSoFar / bucketsElapsed : 0;

  const periodLength = Math.max(
    cycleLength(cycle, startDate, weekLength),
    items.length
  );
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
        ? cycle === Frequency.Annually
          ? busiestDate.toLocaleDateString(undefined, { month: 'short' })
          : `${busiestDate.toLocaleDateString(undefined, { weekday: 'short' })} ${busiestDate.getDate()}`
        : null,
    busiestAmount: busiest?.shareAmount ?? 0,
  };
};
