import { useLayoutEffect, useRef } from 'react';
import { StyledPeriodOption } from './StyledPeriodOption';
import { Frequency } from '../../../../types';
import { months } from '../../../../constants';
import { PeriodOptionProps } from '../../../../interfaces';
import { centerSelectedOption } from '@/helpers/centerSelectedOption';

export default function PeriodOption({
  selectedCycle,
  menu,
  selectedTimeCycleIndex,
  monthsAndDaysArrays,
}: PeriodOptionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    centerSelectedOption(containerRef.current, selectedRef.current);
  }, []);

  const displayWeeks = (item: string[]) => {
    if (item.length === 1) return item[0];
    return item[0] + '- ' + item[item.length - 1];
  };

  return (
    <StyledPeriodOption ref={containerRef}>
      {selectedCycle.value === Frequency.Monthly
        ? months.map((month: string, index: number) => {
            const isSelected = selectedTimeCycleIndex.value === index;

            return (
              <div
                key={index}
                ref={isSelected ? selectedRef : undefined}
                onClick={() => {
                  selectedTimeCycleIndex.value = index;
                  menu.value = null;
                }}
                className={`item ${isSelected ? 'clicked' : ''}`}
              >
                {month}
              </div>
            );
          })
        : monthsAndDaysArrays.map((week: string[], index: number) => {
            const isSelected = selectedTimeCycleIndex.value === index;

            return (
              <div
                key={index}
                ref={isSelected ? selectedRef : undefined}
                onClick={() => {
                  selectedTimeCycleIndex.value = index;
                  menu.value = null;
                }}
                className={`item ${isSelected ? 'clicked' : ''}`}
              >
                {displayWeeks(week)}
              </div>
            );
          })}
    </StyledPeriodOption>
  );
}
