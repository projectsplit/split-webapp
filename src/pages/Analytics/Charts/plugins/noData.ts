export const noData = {
    id: "noData",
    afterDatasetsDraw: (chart: any, args: any, plugins: any) => {
      const {
        ctx,
        data,
        chartArea: { top, left, width, height },
      } = chart;
      ctx.save();
      if (
        chart.config.options.isSuccess &&
        data.datasets[0].data.length === 0
      ) {
       
        ctx.fillStyle = "#0E0E10";
        ctx.fillRect(left, top, width, height);

        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#DDD";
        ctx.textAlign = "center";
        ctx.fillText("No Data to Display", left + width / 2, top + height / 2);
      }
    },
  };