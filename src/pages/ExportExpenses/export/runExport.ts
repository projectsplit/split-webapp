import { DateTime } from 'luxon';
import { ExpensesExportResponse } from '@/types';
import { formatPeriod } from '../helpers/period';
import { buildExcel } from './buildExcel';
import { buildPdf } from './buildPdf';
import { ExportContext, ExportFormat, fileStem, summarise } from './exportModel';
import { loadPdfFonts } from './pdfFonts';
import { saveFile } from './saveFile';

const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** Turns what the page already fetched into a file and hands it over. */
export const runExport = async (
  format: ExportFormat,
  data: ExpensesExportResponse,
  options: {
    startDate: string;
    endDate: string;
    scope: string;
    timeZone: string;
  }
): Promise<void> => {
  const ctx: ExportContext = {
    ...options,
    period: formatPeriod(options.startDate, options.endDate),
    generated: DateTime.now()
      .setZone(options.timeZone)
      .toFormat('d MMM yyyy, HH:mm'),
  };

  const summary = summarise(data);
  const stem = fileStem(options.startDate, options.endDate);

  if (format === 'pdf') {
    const fonts = await loadPdfFonts();
    const bytes = await buildPdf(data, ctx, summary, fonts);
    await saveFile({ name: `${stem}.pdf`, mimeType: 'application/pdf', bytes });
    return;
  }

  const bytes = await buildExcel(data, ctx, summary);
  await saveFile({ name: `${stem}.xlsx`, mimeType: XLSX_MIME, bytes });
};
