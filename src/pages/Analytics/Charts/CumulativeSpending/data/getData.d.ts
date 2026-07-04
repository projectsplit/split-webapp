import { Signal } from '@preact/signals-react';
import { Frequency } from '../../../../../types';
import { ChartDataset } from 'chart.js/auto';
export declare const getData: (labels: string[], selectedCycle: Signal<Frequency>, selectedTimeCycleIndex: Signal<number>, projectedArray: number[], cumulArrayData: number[], currentWeekIndex: number, pointRadiusProjection: number[], pointRadius: number[], pointBackgroundColorProjection: string[], pointBackgroundColor: string[], isSuccess: boolean, selectedYear: number) => {
    labels: string[];
    datasets: ChartDataset<"line", number[]>[];
};
