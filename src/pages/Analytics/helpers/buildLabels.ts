
import { Frequency } from "../../../types";
import { enhanceStringArray } from "./enhanceStringArray";
import { convertToFullMonthNames } from "../../../helpers/monthlyDataHelpers";
import { months } from "../../../constants";

export const buildLabels = (
  cycle: Frequency,
  selectedTimeCycleIndex: number,
  datesToNumbers: number[],
  monthsAndDaysArrays: string[][],
  fractalFactor: number
) => {

  switch (cycle) {
    case Frequency.Monthly:
      return datesToNumbers.map((num) => num.toString().padStart(2, "0"));
    case Frequency.Weekly:
      const toFullMonthNames = getFullMonthNames(monthsAndDaysArrays, selectedTimeCycleIndex);
      //convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex];
      return enhanceStringArray(toFullMonthNames, fractalFactor);
    case Frequency.Annually:
      return enhanceStringArray(months.map((month) => month), fractalFactor);
    default:
      return [""];
  }
};

const getFullMonthNames = (monthsAndDaysArrays: string[][], index: number) => {
  if (convertToFullMonthNames(monthsAndDaysArrays)[index] === undefined) {
    index = 0
    return convertToFullMonthNames(monthsAndDaysArrays)[index]
  }
  return convertToFullMonthNames(monthsAndDaysArrays)[index]
}