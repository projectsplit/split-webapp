import { tokens } from '@/styles/tokens';

export const noData = {
  id: 'noData',
  afterDatasetsDraw: (chart: any, args: any, plugins: any) => {
    const {
      ctx,
      data,
      chartArea: { top, left, width, height },
    } = chart;
    ctx.save();
    if (chart.config.options.isSuccess && data.datasets[0].data.length === 0) {
      ctx.fillStyle = tokens.surface.page;
      ctx.fillRect(left, top, width, height);

      ctx.font = `600 14px ${tokens.font.sans}`;
      ctx.fillStyle = tokens.ink.tertiary;
      ctx.textAlign = 'center';
      ctx.fillText('No Data to Display', left + width / 2, top + height / 2);
    }
  },
};
