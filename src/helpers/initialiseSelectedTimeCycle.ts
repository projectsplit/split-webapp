import { Frequency } from "../types";
import { generateYearsArray } from "./generateYearsArray";


export const initialiseSelectedTimeCycle = (
  cycle: Frequency,
  currentWeekIndex: number,
  selectedYear:number
) => {

  switch (cycle) {
    case Frequency.Monthly:
      return new Date().getMonth(); 
    case Frequency.Weekly:
      return currentWeekIndex; 
    case Frequency.Annually:
      return generateYearsArray().indexOf(selectedYear);
    default:
      return 0;
  }
};
