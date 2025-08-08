import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { Frequency } from "../../../../../types";
import { enhanceStringArray } from "../../../helpers/enhanceStringArray";
import { generateYearsArray } from "../../../helpers/generateYearsArray";
import { isCurrentPeriod } from "../../../helpers/isCurrentPeriod";
import { swapMonthDayToDayMonth } from "../../../helpers/swapMonthDayToDayMonth";
import { displayCurrencyAndAmount } from "../../../../../helpers/displayCurrencyAndAmount";
import { months, shortWeekdays } from "../../../../../constants";
import { getSymbolFromCurrency } from "../../../../../helpers/currency-symbol-map";

export const getChartOptions = (
  isSuccess: boolean,
  expensePoints: number[],
  selectedCycle: Frequency,
  labels: string[],
  enhancedDatesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex: number,
  lastNumberBeforeNaN: number | undefined,
  currentWeekIndex: number,
  hitRadius: number[],
  fractalFactor: number,
  currency: string
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  const enhancedWeekDays = enhanceStringArray(shortWeekdays, fractalFactor);

  const abbreviatedMonths = months.map((month) => month.slice(0, 3))

  const enhancedAbbreviatedMonths = enhanceStringArray(abbreviatedMonths, fractalFactor);

  const currencySymbol = getSymbolFromCurrency(currency)

  return {
    animation: {
      // duration: 500,
      onProgress: function (animation: any) { //clears the top left part of the canvas where animation of datalabel is not shown correctly when moving from 30 to 31 datapoints
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        const width = chartInstance.width;
        const height = chartInstance.height;
        const topLeftWidth = width * 0.03;
        const topLeftHeight = height * 0.03;
        // Clear the canvas
        ctx.clearRect(0, 0, topLeftWidth, topLeftHeight);
      }
    },
    isSuccess: isSuccess,
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: function (e: Event) {
          if (e.stopPropagation)
            e.stopPropagation();
        },
        display: isSuccess && expensePoints?.length !== 0,
        position: "top",
        align: "start",
        labels: {
          usePointStyle: false, // use a square instead of a rectangle
          boxWidth: 10, // set the width of the square
          boxHeight: 10, // set the height of the square
          color: "#858585", // set the color of the square
        },
      },
      title: {
        display: false, //isSuccess && cumulArrayData?.length !== 0,
        text: "Total Spending",
        color: "#a1a1a1",
      },
      customCanvasBackgroundColor: {
        color: "#27273C",
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
            const value: number = context.parsed.y;

            switch (selectedCycle) {
              case Frequency.Monthly:
                if (
                  selectedTimeCycleIndex === new Date().getMonth() &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0 ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0 ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
              case Frequency.Weekly:
                if (
                  selectedTimeCycleIndex === currentWeekIndex &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0 ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0 ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
              case Frequency.Annually:
                if (
                  selectedTimeCycleIndex === generateYearsArray().indexOf(selectedYear) &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0 ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0 ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;

              default:
                return value >= 0 ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}` : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
            }
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 14,
          weight: "bold",
        },

        align: (context: any) => {
          if (
            isCurrentPeriod(selectedCycle, selectedTimeCycleIndex, isSuccess, expensePoints, currentWeekIndex,selectedYear)
            &&
            isNaN(context.dataset.data[context.dataIndex - 1])
            &&
            context.dataset.data.reduce((count: number, num: number) => isNaN(num) ? count + 1 : count, 0) === 1
            &&
            context.dataIndex !== 0
          ) {
            return "bottom"
          } else {
            return "top"
          }
        },// if there is a forecast value and the current value is one datapoint away, show current datapoint at bottom
        padding: 10,
        formatter: (value: number, context: Context) => {

          // Show numeric value over graph for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            (enhancedDatesToNumbers[context.dataIndex] === 15
              && !isCurrentPeriod(selectedCycle, selectedTimeCycleIndex, isSuccess, expensePoints, currentWeekIndex,selectedYear)) ||
            lastNumberBeforeNaN === context.dataIndex
          ) {
            if (value < 0) {
              // If negative, format within parentheses
              return (
                `(${currencySymbol}${((roundThousandsAndMillions(value)))})`
              );
            } else {
              return `${currencySymbol}` + roundThousandsAndMillions((value));
            }
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
                // show the x axis for the first and last date of the month
                if (index === 0 || index === enhancedDatesToNumbers.length - 1) {
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

                break;

              case Frequency.Weekly:

                if (
                  index === 0 ||
                  index === enhancedWeekDays.length - 1 ||
                  index % (fractalFactor + 1) === 0
                ) {
                  return enhancedWeekDays[index];
                }
                break;

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
        }
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