import { DateTime } from 'luxon';
import {
  ExpensesExportResponse,
  ExportExpenseItem,
  ExportParticipant,
  TransactionType,
} from '@/types';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';

/**
 * What both files share: the figures, the wording and the shaping of the rows. The PDF and the
 * spreadsheet only differ in how they draw it.
 */

export type ExportContext = {
  startDate: string;
  endDate: string;
  /** "1 – 31 Oct 2026" */
  period: string;
  /** "All expenses" */
  scope: string;
  /** "21 Oct 2026, 18:40" */
  generated: string;
  timeZone: string;
};

export type CurrencyTotal = {
  currency: string;
  count: number;
  yourShare: number;
  youPaid: number;
  amount: number;
};

export type BreakdownRow = {
  label: string;
  count: number;
  /** Null when the report mixes currencies that could not be converted. */
  yourShare: number | null;
};

export type ExportSummary = {
  count: number;
  byCurrency: CurrencyTotal[];
  /** The currency every headline figure is in. */
  totalsCurrency: string;
  /** True when the headline figures had to be converted, i.e. the report mixes currencies. */
  converted: boolean;
  /** Null when the report mixes currencies and the server could not convert them. */
  yourShare: number | null;
  youPaid: number | null;
  byContext: BreakdownRow[];
  byLabel: BreakdownRow[];
};

export type ExportFile = {
  name: string;
  mimeType: string;
  bytes: Uint8Array;
};

export type ExportFormat = 'pdf' | 'excel';

/** Where an expense lives: the group's name, or the kind when there is no group. */
export const contextOf = (item: ExportExpenseItem): string => {
  switch (item.type) {
    case TransactionType.Group:
      return item.groupName ?? 'Group';
    case TransactionType.NonGroup:
      return 'Quick split';
    default:
      return 'Personal';
  }
};

export const summarise = (data: ExpensesExportResponse): ExportSummary => {
  const byCurrencyMap = new Map<string, CurrencyTotal>();

  for (const item of data.expenses) {
    const row = byCurrencyMap.get(item.currency) ?? {
      currency: item.currency,
      count: 0,
      yourShare: 0,
      youPaid: 0,
      amount: 0,
    };
    row.count += 1;
    row.yourShare += item.yourShare;
    row.youPaid += item.youPaid;
    row.amount += item.amount;
    byCurrencyMap.set(item.currency, row);
  }

  const byCurrency = [...byCurrencyMap.values()].sort(
    (a, b) => b.count - a.count
  );

  // One currency throughout means the figures can be read as they are. Otherwise they only add up
  // once converted, and only if the server managed to convert every one of them.
  const single = byCurrency.length === 1 ? byCurrency[0].currency : null;
  const canConvert =
    data.expenses.length > 0 &&
    data.expenses.every(
      (item) => item.yourShareConverted !== null && item.youPaidConverted !== null
    );

  const shareOf = (item: ExportExpenseItem): number | null =>
    single ? item.yourShare : canConvert ? item.yourShareConverted : null;

  const paidOf = (item: ExportExpenseItem): number | null =>
    single ? item.youPaid : canConvert ? item.youPaidConverted : null;

  const sum = (values: (number | null)[]): number | null =>
    values.some((value) => value === null)
      ? null
      : values.reduce<number>((total, value) => total + (value ?? 0), 0);

  return {
    count: data.expenses.length,
    byCurrency,
    totalsCurrency: single ?? data.currency,
    converted: single === null,
    yourShare: sum(data.expenses.map(shareOf)),
    youPaid: sum(data.expenses.map(paidOf)),
    byContext: breakdown(data.expenses, (item) => [contextOf(item)], shareOf),
    byLabel: breakdown(data.expenses, (item) => item.labels, shareOf),
  };
};

const breakdown = (
  items: ExportExpenseItem[],
  keysOf: (item: ExportExpenseItem) => string[],
  shareOf: (item: ExportExpenseItem) => number | null
): BreakdownRow[] => {
  const rows = new Map<string, BreakdownRow>();

  for (const item of items) {
    for (const key of keysOf(item)) {
      const row = rows.get(key) ?? { label: key, count: 0, yourShare: 0 };
      row.count += 1;
      const share = shareOf(item);
      row.yourShare =
        row.yourShare === null || share === null ? null : row.yourShare + share;
      rows.set(key, row);
    }
  }

  return [...rows.values()].sort(
    (a, b) => (b.yourShare ?? 0) - (a.yourShare ?? 0) || b.count - a.count
  );
};

export const money = (amount: number, currency: string): string =>
  displayMoneyFixed(amount, currency);

/** "You, Alice +2": the reader first, then as many names as fit. */
export const peopleLine = (
  people: ExportParticipant[],
  max = 3
): string => {
  const names = [
    ...people.filter((p) => p.isYou).map(() => 'You'),
    ...people.filter((p) => !p.isYou).map((p) => p.name),
  ];

  if (names.length <= max) return names.join(', ');

  return `${names.slice(0, max).join(', ')} +${names.length - max}`;
};

export const occurredIn = (iso: string, timeZone: string): DateTime =>
  DateTime.fromISO(iso, { zone: 'utc' }).setZone(timeZone);

export const fileStem = (startDate: string, endDate: string): string =>
  `buqs-expenses-${startDate}-to-${endDate}`;
