import { Frequency } from '../../../types';
import { generateYearsArray } from './generateYearsArray';
export const getCarouselItemsBasedOnCycle = (cycle, months, monthsAndDays) => {
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
