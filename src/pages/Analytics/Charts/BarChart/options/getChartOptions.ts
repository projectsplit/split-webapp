import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { Frequency } from "../../../../../types";
import { convertToFullMonthNames } from "../../../../../helpers/monthlyDataHelpers";
import { swapMonthDayToDayMonth } from "../../../helpers/swapMonthDayToDayMonth";
import { displayCurrencyAndAmount } from "../../../../../helpers/displayCurrencyAndAmount";
import { months } from "../../../../../constants";
import { getSymbolFromCurrency } from "../../../../../helpers/currency-symbol-map";

export const getChartOptions = (
  isSuccess: boolean,
  monthsAndDaysArrays: string[][],
  selectedCycle: Frequency,
  labels: string[],

  selectedYear: number,
  selectedTimeCycleIndex: number,
  currency: string
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  const currencySymbol = getSymbolFromCurrency(currency)
  
  return {
    isSuccess: isSuccess,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      tooltip: {
        yAlign: (ctx: any) => {
          // Adjust yAlign based on data value
          if (ctx.tooltip.dataPoints[0].raw > 0) return 'top'
          return 'bottom'
        },
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            switch (selectedCycle) {
              case Frequency.Monthly:
                return labels[index] + " " + fullMonthName + " " + selectedYear;
              case Frequency.Weekly:
                return swapMonthDayToDayMonth(convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex])[index] + " " + selectedYear;
              case Frequency.Annually:
                return months[index] + " " + selectedYear;
            }
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return value >= 0 ?
              `Total spent:` + ` ` + `${displayCurrencyAndAmount(value.toString(), currency)}`
              :
              `Total received:` + ` ` + `${displayCurrencyAndAmount((-value).toString(), currency)}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 12, //TODO adjust based on screen size
          weight: "bold",
        },
        anchor: (context: any) => {
          const anchor = []
          if (context.dataset.data[context.dataIndex] >= 0) {
            anchor.push('end')
          } else {
            anchor.push('start')
          }
          return anchor;
        },
        align: (context: any) => {
          const align = []
          if (context.dataset.data[context.dataIndex] >= 0) {
            align.push('top')
          } else {
            align.push('bottom')
          }
          return align;
        },

        padding: -10,
        formatter: (value: number) => {
          if (value < 0) {
            // If negative, format within parentheses
            return `(${currencySymbol}${roundThousandsAndMillions(value)})`
          }
          if (value > 0) {
            // If non-negative, format normally
            return `${currencySymbol}` + roundThousandsAndMillions(value);
          }
          if (value === 0) return ""
        },
      },
    },
    layout: {
      padding: {
        right: 10,
        top: 20,
        left: 10,
      },
    },
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#DDDDDD",
          font: {
            weight: "bold",
            size: 20, //TODO adjust based on screen size
          },
          callback: (index: number, value: number) => {
            return labels[index];
          },
        },
      },
      y: {

        offset: true,
        display: false,

        grid: {
          display: false,
        },
      },
    },
  } as any;
};
