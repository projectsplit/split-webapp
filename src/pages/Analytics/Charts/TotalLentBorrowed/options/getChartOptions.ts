import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { Frequency } from "../../../../../types";
import { enhanceStringArray } from "../../../helpers/enhanceStringArray";
import { swapMonthDayToDayMonth } from "../../../helpers/swapMonthDayToDayMonth";
import { displayCurrencyAndAmount } from "../../../../../helpers/displayCurrencyAndAmount";
import { months, shortWeekdays } from "../../../../../constants";
import { getSymbolFromCurrency } from "../../../../../helpers/currency-symbol-map";

export const getChartOptions = (
  isSuccess: boolean,
  totalLentExt: number[] | undefined,
  totalBorrowedExt: number[] | undefined,
  selectedCycle: Frequency,
  labels: string[],
  enhancedDatesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex: number,
  currentWeekIndex: number,
  hitRadius: number[],
  fractalFactor: number,
  currency:string
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  const enhancedWeekDays = enhanceStringArray(shortWeekdays, fractalFactor);

  const abbreviatedMonths = months.map((month) => month.slice(0, 3))

  const enhancedAbbreviatedMonths = enhanceStringArray(abbreviatedMonths, fractalFactor);
  
  const currencySymbol = getSymbolFromCurrency(currency)

  return {
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    },
    isSuccess: isSuccess,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: false, // use a square instead of a rectangle
          boxWidth: 10, // set the width of the square
          boxHeight: 10, // set the height of the square
          color: "#DDDDDD", // set the color of the square
        },
        onHover: ((event: any) => {
          event.chart.canvas.style.cursor = "pointer"
        }),
        onLeave: ((event: any) => {
          event.chart.canvas.style.cursor = "default"
        })
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },

      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            if (selectedCycle === Frequency.Monthly)
              return (
                labels[index] +
                " " +
                fullMonthName +
                " " +
                selectedYear.toString()
              );
            if (selectedCycle === Frequency.Weekly)
              return swapMonthDayToDayMonth(labels)[index] + " " + selectedYear.toString();
            if (selectedCycle === Frequency.Annually)
              return labels[index] + " " + selectedYear.toString();
          },
          label: (context: any) => {
            const value = context.parsed.y;
            if (context.dataset.label === "Total Lent") {
              return `Total Lent:` + ` ` + `${displayCurrencyAndAmount(value.toString(), currency)}`;
            } else {
              return `Total Borrowed:` + ` ` + `${displayCurrencyAndAmount(value.toString(), currency)}`;
            }
          },
        },
      },
      datalabels: {
        display: true,
        // color: "white",
        font: {
          size: 14,
          weight: "bold",
        },
        color: (context: Context) => {
          if (context.dataset.label === "Total Lent") {
            return "#317E24";
          } else {
            return "#FF3D3D";
          }
        },

        align: (context: Context) => {
          if (totalLentExt !== undefined && totalBorrowedExt !== undefined)
            if (
              context.dataset.label === "Total Lent" &&
              totalLentExt[context.dataIndex] >
              totalBorrowedExt[context.dataIndex]
            ) {
              return "top";
            } else if (
              context.dataset.label === "Total Lent" &&
              totalLentExt[context.dataIndex] <
              totalBorrowedExt[context.dataIndex]
            )
              return "bottom";
            else if (
              context.dataset.label === "Total Borrowed" &&
              totalLentExt[context.dataIndex] <
              totalBorrowedExt[context.dataIndex]
            ) {
              return "top";
            } else return "bottom";
          return;
        },
        padding: 5,
        formatter: (value: number, context: Context) => {

          // Show price label for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            enhancedDatesToNumbers[context.dataIndex] === 15
          ) {
            if (
              enhancedDatesToNumbers[context.dataIndex] === 15 &&
              (enhancedDatesToNumbers[context.dataset.data.length - 1] === 14 ||
                enhancedDatesToNumbers[context.dataset.data.length - 1] === 16) //condition to not show 15th and 16th consecutive data points
            )
              return "";
            return `${currencySymbol}` + roundThousandsAndMillions(value);

          } else {
            return null;
          }
        },
      },
    },
    layout: {
      padding: {
        right: 25,
        top: 20,
        left: 25,
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
            size: 20,
          },
          callback: (index: number, value: number) => {
            switch (selectedCycle) {
              case Frequency.Monthly:
                // show x axis values for the first and last date of the month
                if (
                  index === 0 ||
                  index === enhancedDatesToNumbers.length - 1
                ) {
                  return labels[index];
                }
                // show x axis values for intervals of 5

                if (
                  parseFloat(labels[index]) % 5 === 0 &&
                  enhancedDatesToNumbers[index + fractalFactor + 1] !== 31
                ) {
                  return Math.floor(parseFloat(labels[index]))
                    .toString()
                    .padStart(2, "0");
                }
                // hide all other x axis values
                break;
              case Frequency.Weekly:
                if (
                  index === 0 ||
                  index === enhancedWeekDays.length - 1 ||
                  index % 5 === 0
                ) { return enhancedWeekDays[index]; } break;

              case Frequency.Annually:

                if (
                  index === 0 ||
                  index === enhancedAbbreviatedMonths.length - 1 ||
                  index % (fractalFactor + 1) === 0
                ) {
                  return enhancedAbbreviatedMonths[index];
                }
                break;
            }
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
    elements: {
      point: {
        radius: 3,
        borderWidth: 3,
        hitRadius: hitRadius,
        hoverRadius: 10,
        pointStyle: "circle",
        pointLabelFontSize: 14,
        pointLabelFontWeight: "bold",
      },
    },
  } as any;
};
