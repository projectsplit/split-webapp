import { Frequency } from '../../../types';
import { generateYearsArray } from '@/helpers/generateYearsArray';

export const getCarouselItemsBasedOnCycle = (
  cycle: Frequency,
  months: string[],
  monthsAndDays: string[][]
) => {
  switch (cycle) {
    case Frequency.Monthly:
      return months;
    case Frequency.Weekly:
      return monthsAndDays;
    case Frequency.Annually:
      return generateYearsArray().map((year) => year.toString());
    default:
      return [''];
  }
};
