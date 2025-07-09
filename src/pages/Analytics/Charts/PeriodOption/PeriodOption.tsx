import React from "react";
import { StyledPeriodOption } from "./StyledPeriodOption";
import { Frequency } from "../../../../types";
import { months } from "../../../../constants";
import { PeriodOptionProps } from "../../../../interfaces";

export default function PeriodOption({
  selectedCycle,
  menu,
  selectedTimeCycleIndex,
  monthsAndDaysArrays,
}: PeriodOptionProps) {

  const displayWeeks = (item:string[])=>{
  if (item.length === 1) return item[0];
  return item[0] + "- " + item[item.length - 1]
  }

 
  return (
    <StyledPeriodOption>
      {selectedCycle.value === Frequency.Monthly
        ? months.map((month: string, index: number) => (
            <div
              key={index}
              onClick={() => {
             
                selectedTimeCycleIndex.value = index;
                menu.value = null;
              }}
              className={`item ${
                selectedTimeCycleIndex.value === index ? "clicked" : ""
              }`}
            >
              {month}
            </div>
          ))
        : monthsAndDaysArrays.map(
            (week: string[], index: number) => (
              <div
              key={index}
              onClick={() => {
                
                selectedTimeCycleIndex.value = index;
                menu.value = null;
              }}
              className={`item ${
                selectedTimeCycleIndex.value === index ? "clicked" : ""
              }`}
            >
              {displayWeeks(week)}
            </div>
            )
          )}
    </StyledPeriodOption>
  );
}
