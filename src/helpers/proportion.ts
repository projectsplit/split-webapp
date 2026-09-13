export const proportion = (part: number, whole: number): number => {
  const p = Math.abs(part);
  const w = Math.abs(whole);

  if (!Number.isFinite(p) || !Number.isFinite(w) || w === 0) return 0;

  return Math.min(p / w, 1);
};

export const percentLabel = (part: number, whole: number): string =>
  `${Math.round(proportion(part, whole) * 100)}%`;
