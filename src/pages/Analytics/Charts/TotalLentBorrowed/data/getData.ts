export const getData = (
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
      return "rgba(255, 74, 94, 0.23)"; //red
    } else return "rgba(34, 135, 29,0.2)"; //green
  };

  return {
    labels: labels,
    datasets: [
      {
        label: "Total Lent",
        data: totalLentExt,
        borderColor: "#317E24",
        //backgroundColor: '#071C00',
        fill: "+1",
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
        label: "Total Borrowed",
        data: totalBorrowedExt,
        borderColor: "#FF3D3D",
        //backgroundColor: "rgba(49, 126, 36, 0.2)",
        fill: "-1",
        tension: 0,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColorTotalLentTotalBorrowed,
      },
    ],
  };
};
