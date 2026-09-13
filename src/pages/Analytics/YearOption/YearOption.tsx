import { useLayoutEffect, useRef } from 'react';
import { StyledYearOption } from './YearOption.styled';

import { generateYearsArray } from '@/helpers/generateYearsArray';
import { YearOptionProps } from '../../../interfaces';
import { centerSelectedOption } from '@/helpers/centerSelectedOption';
import { initialiseSelectedTimeCycle } from '@/helpers/initialiseSelectedTimeCycle';

export default function YearOption({
  selectedYear,
  menu,
  selectedTimeCycleIndex,
  selectedCycle,
  currentWeekIndex,
}: YearOptionProps) {
  const allYears: number[] = generateYearsArray().reverse();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    centerSelectedOption(containerRef.current, selectedRef.current);
  }, []);

  return (
    <StyledYearOption ref={containerRef}>
      {allYears.map((year: number) => {
        const isSelected = year === selectedYear.value;

        return (
          <div
            key={year}
            ref={isSelected ? selectedRef : undefined}
            className={`item ${isSelected ? 'clicked' : ''}`}
            onClick={() => {
              selectedYear.value = year;
              selectedTimeCycleIndex.value = initialiseSelectedTimeCycle(
                selectedCycle.value,
                currentWeekIndex,
                year
              );
              menu.value = null;
            }}
          >
            {year}
          </div>
        );
      })}
    </StyledYearOption>
  );
}
