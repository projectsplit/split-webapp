export const horizontalLine = {
  id: "horizontalLine",
  beforeDraw: (chart: any, args: any, options: any) => {
    const {
      ctx,
      data,
      chartArea: { top, right, bottom, left, width, height },
      scales: { x, y }
    } = chart;
    const zeroY = y.getPixelForValue(0);

    // Draw the horizontal line at y = 0
    ctx.save();
    if (
      chart.config.options.isSuccess &&
      data.datasets[0].data.length !== 0
    ) {
      ctx.strokeStyle = "#939393"; // Line color
      ctx.lineWidth = 1; // Line width
      ctx.beginPath();
      ctx.moveTo(left, zeroY);
      ctx.lineTo(right, zeroY);
      ctx.stroke();
      ctx.restore();
    }

  }
}