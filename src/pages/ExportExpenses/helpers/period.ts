import { DateTime } from 'luxon';

export type PeriodPreset = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

/** Calendar days travel as yyyy-MM-dd; the server reads them in the user's own zone. */
const DAY = 'yyyy-MM-dd';

export const presetRange = (
  preset: Exclude<PeriodPreset, 'custom'>,
  timeZone: string
): { startDate: string; endDate: string } => {
  const now = DateTime.now().setZone(timeZone);

  // Whole calendar units rather than "up to today", so the same preset names the same period
  // whichever day it is pressed on.
  switch (preset) {
    case 'thisMonth':
      return {
        startDate: now.startOf('month').toFormat(DAY),
        endDate: now.endOf('month').toFormat(DAY),
      };
    case 'lastMonth': {
      const last = now.minus({ months: 1 });
      return {
        startDate: last.startOf('month').toFormat(DAY),
        endDate: last.endOf('month').toFormat(DAY),
      };
    }
    case 'thisYear':
      return {
        startDate: now.startOf('year').toFormat(DAY),
        endDate: now.endOf('year').toFormat(DAY),
      };
  }
};

export const formatDay = (day: string): string =>
  DateTime.fromISO(day).toFormat('d MMM yyyy');

/** "1 – 31 Oct 2026", "1 Oct – 15 Nov 2026" or "1 Oct 2025 – 31 Mar 2026": no more than needed. */
export const formatPeriod = (startDate: string, endDate: string): string => {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  if (start.hasSame(end, 'day')) return end.toFormat('d MMM yyyy');
  if (!start.hasSame(end, 'year')) {
    return `${start.toFormat('d MMM yyyy')} – ${end.toFormat('d MMM yyyy')}`;
  }
  if (start.hasSame(end, 'month')) {
    return `${start.toFormat('d')} – ${end.toFormat('d MMM yyyy')}`;
  }
  return `${start.toFormat('d MMM')} – ${end.toFormat('d MMM yyyy')}`;
};

/**
 * The calendar works in UTC instants. Midday keeps the chosen day the same day in every zone,
 * where midnight would slip to the day before once converted.
 */
export const dayToPickerIso = (day: string, timeZone: string): string =>
  DateTime.fromISO(day, { zone: timeZone }).set({ hour: 12 }).toUTC().toISO()!;

export const pickerIsoToDay = (iso: string, timeZone: string): string =>
  DateTime.fromISO(iso, { zone: 'utc' }).setZone(timeZone).toFormat(DAY);
