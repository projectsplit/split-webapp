import { tokens } from '@/styles/tokens';
import {
  getAxisTickLabel,
  getTooltipTitle,
} from '../../options/axisAndTooltip';
import { Context } from 'chartjs-plugin-datalabels/types/context';
import { roundThousandsAndMillions } from '../../../../../helpers/roundThousandsAndMils';
import { Frequency } from '../../../../../types';
import { enhanceStringArray } from '../../../helpers/enhanceStringArray';
import { generateYearsArray } from '@/helpers/generateYearsArray';
import { isCurrentPeriod } from '../../../helpers/isCurrentPeriod';
import { displayCurrencyAndAmount } from '../../../../../helpers/displayCurrencyAndAmount';
import { months } from '../../../../../constants';
import { getSymbolFromCurrency } from '../../../../../helpers/currency-symbol-map';

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
  currency: string,
  weekDays: string[]
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long' };

  const fullMonthName = date.toLocaleDateString('en-US', dateOptions);

  const enhancedWeekDays = enhanceStringArray(weekDays, fractalFactor);

  const abbreviatedMonths = months.map((month) => month.slice(0, 3));

  const enhancedAbbreviatedMonths = enhanceStringArray(
    abbreviatedMonths,
    fractalFactor
  );

  const currencySymbol = getSymbolFromCurrency(currency);

  return {
    animation: {
      onProgress: function (animation: any) {
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        const width = chartInstance.width;
        const height = chartInstance.height;
        const topLeftWidth = width * 0.03;
        const topLeftHeight = height * 0.03;
        ctx.clearRect(0, 0, topLeftWidth, topLeftHeight);
      },
    },
    isSuccess: isSuccess,
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: function (e: Event) {
          if (e.stopPropagation) e.stopPropagation();
        },
        display: isSuccess && expensePoints?.length !== 0,
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: false,
          boxWidth: 10,
          boxHeight: 10,
          color: tokens.ink.secondary,
        },
      },
      title: {
        display: false,
        text: 'Total Spending',
        color: tokens.ink.tertiary,
      },
      customCanvasBackgroundColor: {
        color: tokens.surface.page,
      },
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) =>
            getTooltipTitle(
              context,
              selectedCycle,
              labels,
              fullMonthName,
              selectedYear
            ),
          label: (context: any) => {
            const value: number = context.parsed.y;

            switch (selectedCycle) {
              case Frequency.Monthly:
                if (
                  selectedTimeCycleIndex === new Date().getMonth() &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0
                    ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}`
                    : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0
                  ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}`
                  : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
              case Frequency.Weekly:
                if (
                  selectedTimeCycleIndex === currentWeekIndex &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0
                    ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}`
                    : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0
                  ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}`
                  : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
              case Frequency.Annually:
                if (
                  selectedTimeCycleIndex ===
                    generateYearsArray().indexOf(selectedYear) &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return value >= 0
                    ? `Forecast Spending: ${displayCurrencyAndAmount(value.toString(), currency)}`
                    : `Forecast Receipts: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
                }
                return value >= 0
                  ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}`
                  : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;

              default:
                return value >= 0
                  ? `Total Spent: ${displayCurrencyAndAmount(value.toString(), currency)}`
                  : `Total Received: ${displayCurrencyAndAmount((-value).toString(), currency)}`;
            }
          },
        },
      },
      datalabels: {
        display: true,
        color: tokens.ink.primary,
        font: {
          size: 14,
          weight: 'bold',
        },

        align: (context: any) => {
          if (
            isCurrentPeriod(
              selectedCycle,
              selectedTimeCycleIndex,
              isSuccess,
              expensePoints,
              currentWeekIndex,
              selectedYear
            ) &&
            isNaN(context.dataset.data[context.dataIndex - 1]) &&
            context.dataset.data.reduce(
              (count: number, num: number) => (isNaN(num) ? count + 1 : count),
              0
            ) === 1 &&
            context.dataIndex !== 0
          ) {
            return 'bottom';
          } else {
            return 'top';
          }
        },
        padding: 10,
        formatter: (value: number, context: Context) => {
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            (enhancedDatesToNumbers[context.dataIndex] === 15 &&
              !isCurrentPeriod(
                selectedCycle,
                selectedTimeCycleIndex,
                isSuccess,
                expensePoints,
                currentWeekIndex,
                selectedYear
              )) ||
            lastNumberBeforeNaN === context.dataIndex
          ) {
            if (value < 0) {
              return `(${currencySymbol}${roundThousandsAndMillions(value)})`;
            } else {
              return `${currencySymbol}` + roundThousandsAndMillions(value);
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
          color: tokens.ink.tertiary,
          font: {
            family: tokens.font.mono,
            size: 11,
          },
          callback: (index: number) =>
            getAxisTickLabel(
              index,
              selectedCycle,
              labels,
              enhancedDatesToNumbers,
              enhancedWeekDays,
              enhancedAbbreviatedMonths,
              fractalFactor,
              fractalFactor + 1
            ),
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
        pointStyle: 'circle',
        pointLabelFontSize: 14,
        pointLabelFontWeight: 'bold',
      },
    },
  } as any;
};
