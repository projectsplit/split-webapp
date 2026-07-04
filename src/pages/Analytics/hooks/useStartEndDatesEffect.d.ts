import { Frequency } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useStartAndEndDatesEffect: (selectedCycle: Signal<Frequency>, selectedTimeCycleIndex: Signal<number>, selectedYear: Signal<number>, allWeeksPerYear: Date[][], startDate: Signal<string>, endDate: Signal<string>, timeZone: string) => void;
