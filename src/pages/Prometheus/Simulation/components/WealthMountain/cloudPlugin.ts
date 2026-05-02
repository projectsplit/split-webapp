import { Plugin, Chart } from 'chart.js';

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
};

export const cloudPlugin: Plugin = {
  id: 'mcCloud',
  beforeDatasetsDraw(chart: Chart) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.y) return;

    const { left, right, top, bottom } = chartArea;
    const width = right - left;
    const rand = seededRandom(42);
    const pathCount = 250;
    const steps = 40;

    const yScale = scales.y;
    const startPixel = yScale.getPixelForValue(
      (chart.data.datasets[0]?.data[0] as number) ?? 0,
    );

    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();

    for (let i = 0; i < pathCount; i++) {
      const drift = (rand() - 0.5) * 3;
      const vol = rand() * 6 + 2;
      let y = startPixel;

      ctx.beginPath();
      ctx.moveTo(left, y);

      for (let s = 1; s <= steps; s++) {
        const x = left + (s / steps) * width;
        const change = drift + (rand() - 0.5) * vol;
        y += change;
        y = Math.max(top + 2, Math.min(bottom - 2, y));
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.restore();
  },
};
