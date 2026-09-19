import { tokens } from '@/styles/tokens';
import {
  getAxisTickLabel,
  getTooltipTitle,
} from '../../options/axisAndTooltip';
import { Context } from 'chartjs-plugin-datalabels/types/context';
import { roundThousandsAndMillions } from '../../../../../helpers/roundThousandsAndMils';
import { Frequency } from '../../../../../types';
import { enhanceStringArray } from '../../../helpers/enhanceStringArray';
import { displayCurrencyAndAmount } from '../../../../../helpers/displayCurrencyAndAmount';
import { months, shortWeekdays } from '../../../../../constants';
import { getSymbolFromCurrency } from '../../../../../helpers/currency-symbol-map';

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
  currency: string
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: 'long' };

  const fullMonthName = date.toLocaleDateString('en-US', dateOptions);

  const enhancedWeekDays = enhanceStringArray(shortWeekdays, fractalFactor);

  const abbreviatedMonths = months.map((month) => month.slice(0, 3));

  const enhancedAbbreviatedMonths = enhanceStringArray(
    abbreviatedMonths,
    fractalFactor
  );

  const currencySymbol = getSymbolFromCurrency(currency);

  return {
    transitions: {
      show: {
        animations: {
          x: {
            from: 0,
          },
          y: {
            from: 0,
          },
        },
      },
      hide: {
        animations: {
          x: {
            to: 0,
          },
          y: {
            to: 0,
          },
        },
      },
    },
    isSuccess: isSuccess,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: false,
          boxWidth: 10,
          boxHeight: 10,
          color: tokens.ink.secondary,
        },
        onHover: (event: any) => {
          event.chart.canvas.style.cursor = 'pointer';
        },
        onLeave: (event: any) => {
          event.chart.canvas.style.cursor = 'default';
        },
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
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
            const value = context.parsed.y;
            if (context.dataset.label === 'Total Lent') {
              return (
                `Total Lent:` +
                ` ` +
                `${displayCurrencyAndAmount(value.toString(), currency)}`
              );
            } else {
              return (
                `Total Borrowed:` +
                ` ` +
                `${displayCurrencyAndAmount(value.toString(), currency)}`
              );
            }
          },
        },
      },
      datalabels: {
        display: true,
        font: {
          size: 14,
          weight: 'bold',
        },
        color: (context: Context) => {
          if (context.dataset.label === 'Total Lent') {
            return tokens.direction.owed;
          } else {
            return tokens.direction.owe;
          }
        },

        align: (context: Context) => {
          if (totalLentExt !== undefined && totalBorrowedExt !== undefined)
            if (
              context.dataset.label === 'Total Lent' &&
              totalLentExt[context.dataIndex] >
                totalBorrowedExt[context.dataIndex]
            ) {
              return 'top';
            } else if (
              context.dataset.label === 'Total Lent' &&
              totalLentExt[context.dataIndex] <
                totalBorrowedExt[context.dataIndex]
            )
              return 'bottom';
            else if (
              context.dataset.label === 'Total Borrowed' &&
              totalLentExt[context.dataIndex] <
                totalBorrowedExt[context.dataIndex]
            ) {
              return 'top';
            } else return 'bottom';
          return;
        },
        padding: 5,
        formatter: (value: number, context: Context) => {
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            enhancedDatesToNumbers[context.dataIndex] === 15
          ) {
            if (
              enhancedDatesToNumbers[context.dataIndex] === 15 &&
              (enhancedDatesToNumbers[context.dataset.data.length - 1] === 14 ||
                enhancedDatesToNumbers[context.dataset.data.length - 1] === 16)
            )
              return '';
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
          color: tokens.ink.tertiary,
          font: {
            weight: 'bold',
            size: 20,
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
              5
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
