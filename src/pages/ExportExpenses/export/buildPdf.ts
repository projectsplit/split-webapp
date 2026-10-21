import type { jsPDF } from 'jspdf';
import type { CellHookData, Styles, UserOptions } from 'jspdf-autotable';
import { ExpensesExportResponse } from '@/types';
import {
  contextOf,
  ExportContext,
  ExportSummary,
  money,
  occurredIn,
  peopleLine,
} from './exportModel';
import type { PdfFonts } from './pdfFonts';

/**
 * An A4 report: the period and scope at the top, three figures that answer "so how much was it"
 * at a glance, then the ledger, oldest first, with the reader's own share in the last column.
 * Monochrome with one accent, so it prints as well as it reads.
 */

const FONT = 'NotoSans';

const INK = '#15151A';
const INK_SOFT = '#4A4A55';
const GREY = '#7A7A85';
const HAIR = '#E2E2E8';
const HEAD = '#F1F1F5';
const ZEBRA = '#FAFAFC';
const TILE = '#F4F4F8';
const ACCENT = '#E151EE';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 16;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_Y = PAGE_H - 11;

/** Replaced once every page exists, which is the only time the count is known. */
const TOTAL_PAGES = '{total_pages_count_string}';

type DescriptionCell = {
  content: string;
  labels: string[];
  recurring: boolean;
};

type DrawTable = (options: UserOptions) => number;

export const buildPdf = async (
  data: ExpensesExportResponse,
  ctx: ExportContext,
  summary: ExportSummary,
  fonts: PdfFonts
): Promise<Uint8Array> => {
  const [{ jsPDF }, autotable] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);

  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

  doc.addFileToVFS('NotoSans-Regular.ttf', fonts.regular);
  doc.addFont('NotoSans-Regular.ttf', FONT, 'normal');
  doc.addFileToVFS('NotoSans-SemiBold.ttf', fonts.bold);
  doc.addFont('NotoSans-SemiBold.ttf', FONT, 'bold');

  doc.setProperties({
    title: `Buqs expenses, ${ctx.period}`,
    author: 'Buqs',
    creator: 'Buqs',
  });

  // The two-step form of the plugin, because it hands back the table and with it where the
  // table ended, which the one-call form keeps to itself.
  const drawTable: DrawTable = (options) => {
    const table = autotable.__createTable(doc, options);
    autotable.__drawTable(doc, table);
    return table.finalY ?? (options.startY as number);
  };

  let y = drawHeader(doc, ctx);
  y = drawTiles(doc, summary, y);

  if (summary.converted) {
    y = drawCurrencyTable(doc, drawTable, summary, y);
  }

  drawExpensesTable(doc, drawTable, data, ctx, y);

  // The swap looks for the placeholder the way the *current* font would have written it, so the
  // footer's font has to be current here or it searches for a differently encoded string.
  doc.setFont('helvetica', 'normal');
  doc.putTotalPages(TOTAL_PAGES);

  return new Uint8Array(doc.output('arraybuffer'));
};

const drawHeader = (doc: jsPDF, ctx: ExportContext): number => {
  let y = 20;

  doc.setFont(FONT, 'bold');
  doc.setFontSize(15);
  doc.setTextColor(INK);
  doc.text('Buqs', MARGIN, y);

  doc.setFont(FONT, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(GREY);
  doc.text(`Generated ${ctx.generated}`, PAGE_W - MARGIN, y, { align: 'right' });

  y += 13;
  doc.setFont(FONT, 'bold');
  doc.setFontSize(22);
  doc.setTextColor(INK);
  doc.text('Expense report', MARGIN, y);

  y += 7.5;
  doc.setFont(FONT, 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(INK_SOFT);
  doc.text(`${ctx.period}   ·   ${ctx.scope}`, MARGIN, y);

  y += 6;
  doc.setDrawColor(HAIR);
  doc.setLineWidth(0.25);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  doc.setDrawColor(ACCENT);
  doc.setLineWidth(0.9);
  doc.line(MARGIN, y, MARGIN + 14, y);

  return y + 9;
};

const drawTiles = (doc: jsPDF, summary: ExportSummary, y: number): number => {
  const unavailable = '—';
  const tiles = [
    { label: 'Expenses', value: String(summary.count) },
    {
      label: 'Your share',
      value:
        summary.yourShare === null
          ? unavailable
          : money(summary.yourShare, summary.totalsCurrency),
    },
    {
      label: 'You paid',
      value:
        summary.youPaid === null
          ? unavailable
          : money(summary.youPaid, summary.totalsCurrency),
    },
  ];

  const gap = 4;
  const width = (CONTENT_W - gap * (tiles.length - 1)) / tiles.length;
  const height = 19;

  tiles.forEach((tile, index) => {
    const x = MARGIN + index * (width + gap);

    doc.setFillColor(TILE);
    doc.roundedRect(x, y, width, height, 2, 2, 'F');

    doc.setFont(FONT, 'normal');
    doc.setFontSize(7);
    doc.setTextColor(GREY);
    doc.text(tile.label.toUpperCase(), x + 4.5, y + 6.5, { charSpace: 0.35 });

    doc.setFont(FONT, 'bold');
    doc.setFontSize(14);
    doc.setTextColor(INK);
    doc.text(tile.value, x + 4.5, y + 14.5);
  });

  y += height;

  if (summary.converted) {
    doc.setFont(FONT, 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(GREY);
    doc.text(
      summary.yourShare === null
        ? 'The report mixes currencies and no exchange rates were available, so there is no combined total.'
        : `Totals in ${summary.totalsCurrency}, each expense converted at the rate of the day it happened.`,
      MARGIN,
      y + 5
    );
    y += 5;
  }

  return y + 10;
};

const sectionLabel = (doc: jsPDF, text: string, y: number): number => {
  doc.setFont(FONT, 'bold');
  doc.setFontSize(7);
  doc.setTextColor(GREY);
  doc.text(text.toUpperCase(), MARGIN, y, { charSpace: 0.35 });
  return y + 3.5;
};

const baseStyles: Partial<Styles> = {
  font: FONT,
  fontSize: 8.5,
  textColor: INK,
  lineColor: HAIR,
  lineWidth: 0,
  cellPadding: { top: 2.4, bottom: 2.4, left: 2, right: 2 },
  overflow: 'linebreak',
  valign: 'top',
};

const headStyles: Partial<Styles> = {
  fillColor: HEAD,
  textColor: GREY,
  fontStyle: 'bold',
  fontSize: 7,
  lineWidth: 0,
  cellPadding: { top: 2.8, bottom: 2.6, left: 2, right: 2 },
  valign: 'middle',
};

const bodyStyles: Partial<Styles> = {
  lineWidth: { bottom: 0.15 },
};

const right: Partial<Styles> = { halign: 'right' };

const drawCurrencyTable = (
  doc: jsPDF,
  drawTable: DrawTable,
  summary: ExportSummary,
  y: number
): number => {
  y = sectionLabel(doc, 'By currency', y);

  const finalY = drawTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    tableWidth: 108,
    theme: 'plain',
    styles: baseStyles,
    headStyles,
    bodyStyles,
    alternateRowStyles: { fillColor: ZEBRA },
    columnStyles: {
      0: { cellWidth: 26 },
      1: { cellWidth: 22, ...right, textColor: INK_SOFT },
      2: { cellWidth: 30, ...right, fontStyle: 'bold' },
      3: { cellWidth: 30, ...right, textColor: INK_SOFT },
    },
    head: [['CURRENCY', 'EXPENSES', 'YOUR SHARE', 'YOU PAID']],
    body: summary.byCurrency.map((row) => [
      row.currency,
      String(row.count),
      money(row.yourShare, row.currency),
      money(row.youPaid, row.currency),
    ]),
  });

  return finalY + 10;
};

const drawExpensesTable = (
  doc: jsPDF,
  drawTable: DrawTable,
  data: ExpensesExportResponse,
  ctx: ExportContext,
  y: number
) => {
  y = sectionLabel(doc, 'Expenses', y);

  const body = data.expenses.map((item) => {
    const description: DescriptionCell = {
      content: item.description,
      labels: item.labels,
      recurring: item.isRecurring,
    };

    return [
      occurredIn(item.occurred, ctx.timeZone).toFormat('d MMM yyyy'),
      description,
      contextOf(item),
      peopleLine(item.paidBy, 2),
      money(item.amount, item.currency),
      money(item.yourShare, item.currency),
    ];
  });

  drawTable({
    startY: y,
    margin: { top: 18, right: MARGIN, bottom: 18, left: MARGIN },
    tableWidth: CONTENT_W,
    theme: 'plain',
    rowPageBreak: 'avoid',
    styles: baseStyles,
    headStyles,
    bodyStyles,
    alternateRowStyles: { fillColor: ZEBRA },
    columnStyles: {
      0: { cellWidth: 21, textColor: INK_SOFT },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 27, textColor: INK_SOFT, fontSize: 8 },
      3: { cellWidth: 29, textColor: INK_SOFT, fontSize: 8 },
      4: { cellWidth: 22, ...right, textColor: INK_SOFT },
      5: { cellWidth: 22, ...right, fontStyle: 'bold' },
    },
    head: [['DATE', 'DESCRIPTION', 'WHERE', 'PAID BY', 'AMOUNT', 'YOUR SHARE']],
    body,
    // The description cell gets a blank extra line when there is something to say under it, so
    // the row is tall enough; the small grey line is then drawn into that space by hand.
    didParseCell: (hook: CellHookData) => {
      if (hook.section !== 'body' || hook.column.index !== 1) return;

      const raw = hook.cell.raw as DescriptionCell;
      hook.cell.text = underline(raw) ? [raw.content, ' '] : [raw.content];
    },
    didDrawCell: (hook: CellHookData) => {
      if (hook.section !== 'body' || hook.column.index !== 1) return;

      const raw = hook.cell.raw as DescriptionCell;
      const text = underline(raw);
      if (!text) return;

      const cell = hook.cell;
      const maxWidth = cell.width - cell.padding('left') - cell.padding('right');

      doc.setFont(FONT, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(GREY);

      const [first, ...rest] = doc.splitTextToSize(text, maxWidth) as string[];
      const line = rest.length > 0 ? `${first.replace(/\s+\S*$/, '')}…` : first;

      doc.text(
        line,
        cell.x + cell.padding('left'),
        cell.y + cell.height - cell.padding('bottom') - 0.9
      );
    },
    didDrawPage: () => drawFooter(doc),
  });
};

/** What sits under a description: that it recurs, and its labels. */
const underline = (cell: DescriptionCell): string =>
  [...(cell.recurring ? ['Recurring'] : []), ...cell.labels].join('  ·  ');

const drawFooter = (doc: jsPDF) => {
  // Helvetica on purpose: the page count is filled in afterwards by swapping a placeholder in the
  // page stream, which only works for a font whose text is stored as plain characters.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(GREY);
  doc.text('Buqs  ·  Expense report', MARGIN, FOOTER_Y);
  // Left-aligned at a fixed spot rather than right-aligned, because the placeholder is wider
  // than the number that replaces it.
  doc.text(
    `Page ${doc.getCurrentPageInfo().pageNumber} of ${TOTAL_PAGES}`,
    PAGE_W - MARGIN - 20,
    FOOTER_Y
  );
};
