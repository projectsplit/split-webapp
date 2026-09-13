import { tokens } from '@/styles/tokens';
export const getLentBorrowedDatasets = (
  totalLentExt: number[] | undefined,
  totalBorrowedExt: number[] | undefined,
  labels: string[],
  pointRadius: number[],
  pointBackgroundColorTotalLent: string[],
  pointBackgroundColorTotalLentTotalBorrowed: string[]
) => {
  const paintBackgroundUnderLines = (ctx: any) => {
    if (totalLentExt !== undefined && totalBorrowedExt !== undefined)
      if (
        totalBorrowedExt[ctx.p0DataIndex] > totalLentExt[ctx.p0DataIndex] ||
        totalBorrowedExt[ctx.p1DataIndex] > totalLentExt[ctx.p1DataIndex]
      ) {
        return tokens.chart.oweArea;
      } else return tokens.chart.owedArea;
  };

  return {
    labels: labels,
    datasets: [
      {
        label: 'Total Lent',
        data: totalLentExt,
        borderColor: tokens.direction.owed,
        fill: '+1',
        tension: 0,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColorTotalLent,
        stepped: false,
        segment: {
          backgroundColor: (ctx: any) => paintBackgroundUnderLines(ctx),
        },
      },
      {
        label: 'Total Borrowed',
        data: totalBorrowedExt,
        borderColor: tokens.direction.owe,
        fill: '-1',
        tension: 0,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColorTotalLentTotalBorrowed,
      },
    ],
  };
};
