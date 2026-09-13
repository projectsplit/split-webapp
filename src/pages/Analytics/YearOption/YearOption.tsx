import { StyledYearOption } from './YearOption.styled';

import { generateYearsArray } from '@/helpers/generateYearsArray';
import { YearOptionProps } from '../../../interfaces';

export default function YearOption({ selectedYear, menu }: YearOptionProps) {
  const allYears: number[] = generateYearsArray().reverse();

  return (
    <StyledYearOption>
      {allYears.map((year: number) => (
        <div
          key={year}
          className={`item ${year === selectedYear.value ? 'clicked' : ''}`}
          onClick={() => {
            selectedYear.value = year;
            menu.value = null;
          }}
        >
          {year}
        </div>
      ))}
    </StyledYearOption>
  );
}
