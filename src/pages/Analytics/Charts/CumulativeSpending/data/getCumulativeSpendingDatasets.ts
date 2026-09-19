import { tokens } from '../../../../../styles/tokens';
import { Signal } from '@preact/signals-react';
import { Frequency } from '../../../../../types';
import { ChartDataset } from 'chart.js/auto';
import { generateYearsArray } from '@/helpers/generateYearsArray';
import { isCurrentPeriod } from '../../../helpers/isCurrentPeriod';

export const getCumulativeSpendingDatasets = (
  labels: string[],
  selectedCycle: Signal<Frequency>,
  selectedTimeCycleIndex: Signal<number>,
  projectedArray: number[],
  cumulArrayData: number[],
  currentWeekIndex: number,
  pointRadiusProjection: number[],
  pointRadius: number[],
  pointBackgroundColorProjection: string[],
  pointBackgroundColor: string[],
  isSuccess: boolean,
  selectedYear: number
) => {
  const gradient = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D;

  const linearGradient = gradient.createLinearGradient(0, 0, 0, 300);
  linearGradient.addColorStop(0, tokens.chart.spentArea);
  linearGradient.addColorStop(1, 'transparent');

  const skipped = (ctx: any, value: any) => {
    return ctx.p0.skip || ctx.p1.skip ? value : undefined;
  };

  return {
    labels: labels,
    datasets: [
      {
        label: 'Total Spent',
        data: (() => {
          return projectedArray;
        })(),
        borderColor: (ctx: any) => {
          if (
            selectedTimeCycleIndex.value === new Date().getMonth() ||
            selectedTimeCycleIndex.value === currentWeekIndex ||
            selectedTimeCycleIndex.value ===
              generateYearsArray().indexOf(selectedYear)
          ) {
            return ctx.chart.data.datasets[0].data.length - 1 === ctx.dataIndex
              ? tokens.ink.tertiary
              : tokens.accent.you.ink;
          }
          return tokens.accent.you.ink;
        },
        segment: {
          borderColor: (ctx: any) => skipped(ctx, tokens.ink.tertiary),
          borderDash: (ctx: any) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
        backgroundColor: linearGradient,
        fill: 'start',
        tension: 0,
        borderWidth: 2,
        pointRadius: pointRadiusProjection,
        pointBackgroundColor: pointBackgroundColorProjection,
      },
      isCurrentPeriod(
        selectedCycle.value,
        selectedTimeCycleIndex.value,
        isSuccess,
        cumulArrayData,
        currentWeekIndex,
        selectedYear
      )
        ? {
            label: 'Forecast',
            data: [],
            borderColor: tokens.ink.tertiary,
            borderWidth: 2,
          }
        : null,
    ].filter(Boolean) as ChartDataset<'line', number[]>[],
  };
};
