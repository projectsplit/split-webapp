export const convertDaysToDaysHoursAndMinutes = (
  endDate: string | undefined
): { days: number; hours: number; minutes: number } => {
  if (!endDate) return { days: 0, hours: 0, minutes: 0 };

  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();

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
