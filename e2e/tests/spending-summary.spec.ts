import { test, expect } from '@playwright/test';
import { getSpendingSummary } from '../../src/helpers/spendingSummary';
import { Frequency, type SpendingChartsResponseItem } from '../../src/types';

const DAY_MS = 86_400_000;

const bucket = (
  from: Date,
  shareAmount: number,
  accumulativeShareAmount: number
): SpendingChartsResponseItem => ({
  from,
  to: new Date(from.getTime() + DAY_MS - 1),
  shareAmount,
  accumulativeShareAmount,
  paymentAmount: 0,
  accumulativePaymentAmount: 0,
  lentAmount: 0,
  accumulativeLentAmount: 0,
  borrowedAmount: 0,
  accumulativeBorrowedAmount: 0,
});

const dailyBuckets = (start: Date, days: number, elapsedDays: number, perDay: number) =>
  Array.from({ length: days }, (_, i) => {
    const spent = i < elapsedDays ? perDay : 0;
    const total = perDay * Math.min(i + 1, elapsedDays);
    return bucket(new Date(start.getTime() + i * DAY_MS), spent, total);
  });

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

test.describe('Analytics spending summary', () => {
  test('daily average and forecast only count days that have started', () => {
    const start = new Date(Date.now() - 2 * DAY_MS - 1_000);
    const items = dailyBuckets(start, 7, 3, 10);

    const summary = getSpendingSummary({ items }, isoDate(start), Frequency.Weekly, 7);

    expect(summary?.spentSoFar).toBe(30);
    expect(summary?.dailyAverage).toBe(10);
    expect(summary?.forecast).toBe(70);
  });

  test('monthly forecast covers the whole month', () => {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const items = dailyBuckets(firstOfMonth, daysInMonth, now.getDate(), 5);

    const summary = getSpendingSummary({ items }, isoDate(firstOfMonth), Frequency.Monthly, 7);

    expect(summary?.dailyAverage).toBe(5);
    expect(summary?.forecast).toBe(5 * daysInMonth);
  });

  test('a partial week forecasts over its own length', () => {
    const start = new Date(Date.now() - DAY_MS - 1_000);
    const items = dailyBuckets(start, 4, 2, 8);

    const summary = getSpendingSummary({ items }, isoDate(start), Frequency.Weekly, 4);

    expect(summary?.dailyAverage).toBe(8);
    expect(summary?.forecast).toBe(32);
  });

  test('the busiest period in the yearly view is a month', () => {
    const year = new Date().getFullYear();
    const shares = [10, 20, 90, 5, 0, 0, 0, 0, 0, 0, 0, 0];
    let total = 0;
    const items = shares.map((amount, month) => {
      total += amount;
      return bucket(new Date(year, month, 1), amount, total);
    });

    const summary = getSpendingSummary({ items }, `${year}-01-01`, Frequency.Annually, 7);

    expect(summary?.busiestAmount).toBe(90);
    expect(summary?.busiestLabel).toBe(
      new Date(year, 2, 1).toLocaleDateString(undefined, { month: 'short' })
    );
    expect(summary?.busiestLabel).not.toMatch(/\d/);
  });
});
