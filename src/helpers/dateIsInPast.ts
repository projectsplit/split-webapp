import { DateTime } from 'luxon';

// See dateIsInFuture: the incoming string is wall clock time in the user's zone, not UTC.
export const dateIsInPast = (date: string | undefined, timeZoneId?: string) => {
  if (!date) return false;
  return DateTime.fromISO(date, { zone: timeZoneId }) < DateTime.now();
};
