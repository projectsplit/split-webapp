import { Context } from 'chartjs-plugin-datalabels/types/context';
import { Frequency } from '../../../../types';
import { swapMonthDayToDayMonth } from '../../helpers/swapMonthDayToDayMonth';

export const getAxisTickLabel = (
  index: number,
  selectedCycle: Frequency,
  labels: string[],
  enhancedDatesToNumbers: number[],
  enhancedWeekDays: string[],
  enhancedAbbreviatedMonths: string[],
  fractalFactor: number,
  weeklyStep: number
) => {
  switch (selectedCycle) {
    case Frequency.Monthly:
      if (index === 0 || index === enhancedDatesToNumbers.length - 1) {
        return labels[index];
      }
      if (
        parseFloat(labels[index]) % 5 === 0 &&
        enhancedDatesToNumbers[index + fractalFactor + 1] !== 31
      ) {
        return Math.floor(parseFloat(labels[index]))
          .toString()
          .padStart(2, '0');
      }
      break;
    case Frequency.Weekly:
      if (
        index === 0 ||
        index === enhancedWeekDays.length - 1 ||
        index % weeklyStep === 0
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
};

export const getTooltipTitle = (
  context: Context[],
  selectedCycle: Frequency,
  labels: string[],
  fullMonthName: string,
  selectedYear: number
) => {
  const index = context[0].dataIndex;
  if (selectedCycle === Frequency.Monthly)
    return labels[index] + ' ' + fullMonthName + ' ' + selectedYear.toString();
  if (selectedCycle === Frequency.Weekly)
    return (
      swapMonthDayToDayMonth(labels)[index] + ' ' + selectedYear.toString()
    );
  if (selectedCycle === Frequency.Annually)
    return labels[index] + ' ' + selectedYear.toString();
};
