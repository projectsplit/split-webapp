import { DateTime } from 'luxon';

// Budget dates arrive as wall clock times in the user's zone with no offset, so they have to be
// anchored to that zone before being compared to now. Comparing the raw strings treats them as UTC
// and reports a cycle that has already started as still pending for the length of the offset.
export const dateIsInFuture = (
  date: string | undefined,
  timeZoneId?: string
) => {
  if (!date) return false;
  return DateTime.fromISO(date, { zone: timeZoneId }) > DateTime.now();
};
