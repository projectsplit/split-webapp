import { Plugin, Chart } from 'chart.js';

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
};

const getPointY = (point: unknown): number | null => {
  if (typeof point === 'number') return point;
  if (point && typeof (point as any).y === 'number') return (point as any).y;
  return null;
};

export const cloudPlugin: Plugin = {
  id: 'mcCloud',
  beforeDatasetsDraw(chart: Chart) {
    if (chart.config.type !== 'line') return;

    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.y) return;

    const datasets = chart.data.datasets;
    if (!datasets.length) return;

    const startValue = getPointY(datasets[0]?.data[0]) ?? 0;

    let minEnd = Infinity;
    let maxEnd = -Infinity;
    for (const ds of datasets) {
      const last = ds.data[ds.data.length - 1];
      const v = getPointY(last);
      if (v == null) continue;
      if (v < minEnd) minEnd = v;
      if (v > maxEnd) maxEnd = v;
    }
    if (!isFinite(minEnd) || !isFinite(maxEnd)) return;

    const { left, right, top, bottom } = chartArea;
    const width = right - left;
    const yScale = scales.y;
    const startPixel = yScale.getPixelForValue(startValue);
    const minEndPixel = yScale.getPixelForValue(minEnd);
    const maxEndPixel = yScale.getPixelForValue(maxEnd);

    const rand = seededRandom(42);
    const pathCount = 200;
    const steps = 48;

    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();

    const rangePixels = minEndPixel - maxEndPixel;
    const overshoot = rangePixels * 0.3;

    for (let i = 0; i < pathCount; i++) {
      const t = rand();
      const endPixel =
        (maxEndPixel - overshoot) +
        (rangePixels + overshoot * 2) * t;

      ctx.beginPath();
      ctx.moveTo(left, startPixel);

      for (let s = 1; s <= steps; s++) {
        const frac = s / steps;
        const x = left + frac * width;
        const baseline = startPixel + (endPixel - startPixel) * frac;
        const noise = (rand() - 0.5) * 4 * Math.sin(frac * Math.PI);
        const y = Math.max(top + 1, Math.min(bottom - 1, baseline + noise));
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(0, 106, 255, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    ctx.restore();
  },
};
