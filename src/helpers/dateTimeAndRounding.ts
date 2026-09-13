import { DateTime as LuxonDateTime } from 'luxon';

const mod = (x: number, y: number): number => ((x % y) + y) % y;

export const closestMultiple = (x: number, y: number): number => {
  const remainder = mod(x, y);
  const below = x - remainder;
  const above = below + y;
  const closestMultiple = x - below < above - x ? below : above;
  return closestMultiple;
};

export function round(number: number, increment: number) {
  return Math.round(number / increment) * increment;
}

export const isNow = (dateTimeIso: string) => {
  const dt = LuxonDateTime.fromISO(dateTimeIso);
  const now = LuxonDateTime.fromISO(new Date().toISOString());
  return dt.toFormat('yyyyMMddHHmm') === now.toFormat('yyyyMMddHHmm');
};

export const toLuxon = (
  utcString: string,
  timezoneId: string
): LuxonDateTime => {
  return LuxonDateTime.fromISO(utcString, { zone: 'utc' }).setZone(timezoneId);
};

export const toUtcString = (dateTime: LuxonDateTime): string => {
  return dateTime.setZone('utc').toISO()!;
};
