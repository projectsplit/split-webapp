import { DateTime } from 'luxon';

export const convertDaysToDaysHoursAndMinutes = (
  endDate: string | undefined,
  timeZoneId: string
): { days: number; hours: number; minutes: number } => {
  if (!endDate) return { days: 0, hours: 0, minutes: 0 };

  const now = DateTime.now().setZone(timeZoneId);
  const end = DateTime.fromISO(endDate, { zone: timeZoneId });
  const diffMs = end.diff(now).as('milliseconds');

  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0 };

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
  };
};
