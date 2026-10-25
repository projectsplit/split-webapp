import type { Cell, Workbook, Worksheet } from 'exceljs';
import { ExpensesExportResponse } from '@/types';
import { significantDigitsFromTicker } from '@/helpers/openExchangeRates';
import {
  contextOf,
  ExportContext,
  ExportSummary,
  occurredIn,
  peopleLine,
} from './exportModel';

/**
 * A workbook with a summary sheet in front and the ledger behind it. The ledger keeps amounts as
 * numbers with the currency in its own column, so sums and filters work the way a spreadsheet
 * person expects, and the summary says what the numbers add up to without any formula having to
 * be trusted first.
 */

const FONT = 'Calibri';

const WHITE = 'FFFFFFFF';
const INK = 'FF15151A';
const INK_SOFT = 'FF4A4A55';
const GREY = 'FF7A7A85';
const HEAD_FILL = 'FF1C1C21';
const ZEBRA = 'FFF6F6F9';
const HAIR = 'FFE2E2E8';

type TableValue = string | number | null | { amount: number | null; currency: string };

export const buildExcel = async (
  data: ExpensesExportResponse,
  ctx: ExportContext,
  summary: ExportSummary
): Promise<Uint8Array> => {
  const ExcelJS = await loadExcelJs();

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Buqs';
  workbook.created = new Date();

  addSummarySheet(workbook, ctx, summary);
  addExpensesSheet(workbook, data, ctx, summary);

  const out: unknown = await workbook.xlsx.writeBuffer();

  return out instanceof Uint8Array ? out : new Uint8Array(out as ArrayBuffer);
};

const loadExcelJs = async (): Promise<typeof import('exceljs')> => {
  const mod = await import('exceljs');

  // The browser build is UMD; depending on how it is bundled it arrives as the namespace itself
  // or under default.
  return ((mod as unknown as { default?: typeof import('exceljs') }).default ??
    mod) as typeof import('exceljs');
};

const addSummarySheet = (
  workbook: Workbook,
  ctx: ExportContext,
  summary: ExportSummary
) => {
  const sheet = workbook.addWorksheet('Summary', {
    views: [{ showGridLines: false }],
  });

  sheet.columns = [
    { width: 32 },
    { width: 13 },
    { width: 17 },
    { width: 17 },
    { width: 17 },
  ];

  const brand = sheet.getCell('A1');
  brand.value = 'Buqs';
  brand.font = { name: FONT, size: 13, bold: true, color: { argb: INK } };

  const title = sheet.getCell('A2');
  title.value = 'Expense report';
  title.font = { name: FONT, size: 20, bold: true, color: { argb: INK } };
  sheet.getRow(2).height = 30;

  metaRow(sheet, 3, 'Period', ctx.period);
  metaRow(sheet, 4, 'Scope', ctx.scope);
  metaRow(sheet, 5, 'Generated', ctx.generated);
  metaRow(sheet, 6, 'Time zone', ctx.timeZone);

  let row = 8;

  row = sectionTitle(sheet, row, 'Totals');
  row = writeTable(
    sheet,
    row,
    ['Currency', 'Expenses', 'Your share', 'You paid', 'Total amount'],
    summary.byCurrency.map((c) => [
      c.currency,
      c.count,
      { amount: c.yourShare, currency: c.currency },
      { amount: c.youPaid, currency: c.currency },
      { amount: c.amount, currency: c.currency },
    ])
  );

  if (summary.converted) {
    if (summary.yourShare !== null && summary.youPaid !== null) {
      row = writeTotalsRow(sheet, row, [
        `All, in ${summary.totalsCurrency}`,
        summary.count,
        { amount: summary.yourShare, currency: summary.totalsCurrency },
        { amount: summary.youPaid, currency: summary.totalsCurrency },
        null,
      ]);
      row = noteRow(
        sheet,
        row,
        'Converted at the exchange rate of the day each expense happened.'
      );
    } else {
      row = noteRow(
        sheet,
        row,
        'Mixed currencies with no exchange rates available, so there is no combined total.'
      );
    }
  }

  const shareHeader =
    summary.yourShare === null
      ? 'Your share'
      : `Your share (${summary.totalsCurrency})`;

  row += 1;
  row = sectionTitle(sheet, row, 'By group');
  row = writeTable(
    sheet,
    row,
    ['Where', 'Expenses', shareHeader],
    summary.byContext.map((r) => [
      r.label,
      r.count,
      { amount: r.yourShare, currency: summary.totalsCurrency },
    ])
  );

  if (summary.byLabel.length > 0) {
    row += 1;
    row = sectionTitle(sheet, row, 'By label');
    writeTable(
      sheet,
      row,
      ['Label', 'Expenses', shareHeader],
      summary.byLabel.map((r) => [
        r.label,
        r.count,
        { amount: r.yourShare, currency: summary.totalsCurrency },
      ])
    );
  }
};

const addExpensesSheet = (
  workbook: Workbook,
  data: ExpensesExportResponse,
  ctx: ExportContext,
  summary: ExportSummary
) => {
  const sheet = workbook.addWorksheet('Expenses', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  // A converted column only earns its place when the sheet mixes currencies; otherwise it would
  // repeat "Your share" to the cent.
  const showConverted =
    summary.converted &&
    data.expenses.some((e) => e.yourShareConverted !== null);

  const columns = [
    { header: 'Date', key: 'date', width: 13 },
    { header: 'Time', key: 'time', width: 8 },
    { header: 'Description', key: 'description', width: 40 },
    { header: 'Where', key: 'where', width: 20 },
    { header: 'Paid by', key: 'paidBy', width: 22 },
    { header: 'Split with', key: 'splitWith', width: 30 },
    { header: 'Amount', key: 'amount', width: 13 },
    { header: 'Currency', key: 'currency', width: 10 },
    { header: 'Your share', key: 'yourShare', width: 13 },
    { header: 'You paid', key: 'youPaid', width: 13 },
    ...(showConverted
      ? [
          {
            header: `Your share (${data.currency})`,
            key: 'yourShareConverted',
            width: 18,
          },
        ]
      : []),
    { header: 'Labels', key: 'labels', width: 24 },
    { header: 'Place', key: 'place', width: 30 },
    { header: 'Recurring', key: 'recurring', width: 11 },
  ];

  sheet.columns = columns;

  const numericKeys = new Set(['amount', 'yourShare', 'youPaid', 'yourShareConverted']);
  const columnIndex = (key: string) => columns.findIndex((c) => c.key === key) + 1;

  const headerRow = sheet.getRow(1);
  headerRow.height = 22;
  columns.forEach((column, i) => {
    styleHeader(headerRow.getCell(i + 1), numericKeys.has(column.key));
  });

  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columns.length },
  };

  data.expenses.forEach((item, index) => {
    const when = occurredIn(item.occurred, ctx.timeZone);

    const row = sheet.addRow({
      // Midnight UTC of the local day: a spreadsheet date has no zone, so this is the one value
      // that shows the same day everywhere.
      date: new Date(Date.UTC(when.year, when.month - 1, when.day)),
      time: when.toFormat('HH:mm'),
      description: item.description,
      where: contextOf(item),
      paidBy: peopleLine(item.paidBy, Number.MAX_SAFE_INTEGER),
      splitWith: peopleLine(item.splitWith, Number.MAX_SAFE_INTEGER),
      amount: item.amount,
      currency: item.currency,
      yourShare: item.yourShare,
      youPaid: item.youPaid,
      ...(showConverted
        ? { yourShareConverted: item.yourShareConverted ?? null }
        : {}),
      labels: item.labels.join(', '),
      place: item.place ?? '',
      recurring: item.isRecurring ? 'Yes' : '',
    });

    row.eachCell({ includeEmpty: true }, (cell, col) => {
      styleBody(cell, index % 2 === 1);
      const key = columns[col - 1].key;

      if (key === 'date') {
        cell.numFmt = 'd mmm yyyy';
      } else if (numericKeys.has(key)) {
        cell.numFmt = numberFormat(
          key === 'yourShareConverted' ? data.currency : item.currency
        );
        cell.alignment = { horizontal: 'right' };
      }
    });
  });

  const lastDataRow = sheet.rowCount;
  const totals = sheet.getRow(lastDataRow + 1);
  const range = (key: string) => {
    const letter = columnLetter(columnIndex(key));
    return `${letter}2:${letter}${lastDataRow}`;
  };

  totals.getCell(1).value = 'Total';
  // SUBTOTAL rather than SUM so the figures follow whatever filter is applied.
  totals.getCell(columnIndex('description')).value = {
    formula: `SUBTOTAL(103,${range('description')})`,
  };
  totals.getCell(columnIndex('description')).numFmt = '0" expenses"';

  const totalColumns = summary.converted
    ? showConverted
      ? ['yourShareConverted']
      : []
    : ['amount', 'yourShare', 'youPaid'];

  for (const key of totalColumns) {
    const cell = totals.getCell(columnIndex(key));
    cell.value = { formula: `SUBTOTAL(109,${range(key)})` };
    cell.numFmt = numberFormat(
      key === 'yourShareConverted' ? data.currency : summary.totalsCurrency
    );
    cell.alignment = { horizontal: 'right' };
  }

  // Every column, so the rule above the row runs the full width rather than stopping at the
  // last cell that has a value.
  for (let col = 1; col <= columns.length; col++) {
    styleTotals(totals.getCell(col));
  }
};

const metaRow = (sheet: Worksheet, row: number, label: string, value: string) => {
  const labelCell = sheet.getCell(row, 1);
  labelCell.value = label;
  labelCell.font = { name: FONT, size: 10, color: { argb: GREY } };

  const valueCell = sheet.getCell(row, 2);
  valueCell.value = value;
  valueCell.font = { name: FONT, size: 10, color: { argb: INK } };
};

const sectionTitle = (sheet: Worksheet, row: number, title: string): number => {
  const cell = sheet.getCell(row, 1);
  cell.value = title.toUpperCase();
  cell.font = { name: FONT, size: 9, bold: true, color: { argb: GREY } };
  sheet.getRow(row).height = 18;
  return row + 1;
};

const noteRow = (sheet: Worksheet, row: number, text: string): number => {
  const cell = sheet.getCell(row, 1);
  cell.value = text;
  cell.font = { name: FONT, size: 9, italic: true, color: { argb: GREY } };
  return row + 1;
};

const writeTable = (
  sheet: Worksheet,
  startRow: number,
  headers: string[],
  rows: TableValue[][]
): number => {
  const headerRow = sheet.getRow(startRow);
  headerRow.height = 20;
  headers.forEach((header, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = header;
    styleHeader(cell, i > 0);
  });

  rows.forEach((values, rowIndex) => {
    const row = sheet.getRow(startRow + 1 + rowIndex);
    values.forEach((value, i) => {
      const cell = row.getCell(i + 1);
      setValue(cell, value);
      styleBody(cell, rowIndex % 2 === 1);
    });
  });

  return startRow + 1 + rows.length;
};

const writeTotalsRow = (sheet: Worksheet, row: number, values: TableValue[]): number => {
  const totals = sheet.getRow(row);
  values.forEach((value, i) => {
    const cell = totals.getCell(i + 1);
    setValue(cell, value);
    styleTotals(cell);
  });
  return row + 1;
};

const setValue = (cell: Cell, value: TableValue) => {
  if (value === null) {
    cell.value = null;
    return;
  }

  if (typeof value === 'object') {
    // Sums of floats carry noise in their last digits; the file should hold the figure, not the
    // arithmetic that produced it.
    cell.value =
      value.amount === null ? '—' : roundTo(value.amount, value.currency);
    cell.numFmt = numberFormat(value.currency);
    cell.alignment = { horizontal: 'right' };
    return;
  }

  cell.value = value;
  if (typeof value === 'number') {
    cell.alignment = { horizontal: 'right' };
  }
};

const styleHeader = (cell: Cell, numeric: boolean) => {
  cell.font = { name: FONT, size: 10, bold: true, color: { argb: WHITE } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEAD_FILL } };
  cell.alignment = {
    vertical: 'middle',
    horizontal: numeric ? 'right' : 'left',
  };
};

const styleBody = (cell: Cell, striped: boolean) => {
  cell.font = { name: FONT, size: 10, color: { argb: INK_SOFT } };
  cell.border = { bottom: { style: 'thin', color: { argb: HAIR } } };
  if (striped) {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
  }
};

const styleTotals = (cell: Cell) => {
  cell.font = { name: FONT, size: 10, bold: true, color: { argb: INK } };
  cell.border = { top: { style: 'thin', color: { argb: INK } } };
};

/** "#,##0.00" for most currencies, "#,##0" for yen and the like. */
const numberFormat = (currency: string): string => {
  const digits = significantDigitsFromTicker(currency);
  return digits > 0 ? `#,##0.${'0'.repeat(digits)}` : '#,##0';
};

const roundTo = (amount: number, currency: string): number => {
  const factor = 10 ** significantDigitsFromTicker(currency);
  return Math.round(amount * factor) / factor;
};

const columnLetter = (index: number): string => {
  let letters = '';
  let n = index;
  while (n > 0) {
    const remainder = (n - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    n = Math.floor((n - 1) / 26);
  }
  return letters;
};
