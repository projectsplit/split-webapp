import { DateTime } from 'luxon';

export const dateIsInFuture = (
  date: string | undefined,
  timeZoneId?: string
) => {
  if (!date) return false;
  return DateTime.fromISO(date, { zone: timeZoneId }) > DateTime.now();
};
