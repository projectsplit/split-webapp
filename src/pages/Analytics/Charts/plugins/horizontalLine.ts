import { tokens } from '@/styles/tokens';

export const horizontalLine = {
  id: 'horizontalLine',
  beforeDraw: (chart: any) => {
    const {
      ctx,
      data,
      chartArea: { right, left },
      scales: { y },
    } = chart;
    const zeroY = y.getPixelForValue(0);

    ctx.save();
    if (chart.config.options.isSuccess && data.datasets[0].data.length !== 0) {
      ctx.strokeStyle = tokens.surface.hairline;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, zeroY);
      ctx.lineTo(right, zeroY);
      ctx.stroke();
      ctx.restore();
    }
  },
};
