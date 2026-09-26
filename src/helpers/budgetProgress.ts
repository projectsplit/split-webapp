export const pct = (part: number, whole: number) => {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return 0;
  return Math.min(Math.max((part / whole) * 100, 0), 100);
};

export const elapsedPercent = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;
  return pct(Date.now() - start, end - start);
};
