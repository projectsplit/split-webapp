import React from "react";
import { StyledYearOption } from "./YearOption.styled";

import { useTheme } from "styled-components";
import { generateYearsArray } from "../helpers/generateYearsArray";
import { CategoryButton } from "../../../components/CategoryButton/CategoryButton";
import { YearOptionProps } from "../../../interfaces";

export default function YearOption({ selectedYear, menu }: YearOptionProps) {
  const theme = useTheme();

  const allYears: number[] = generateYearsArray().reverse();

  return (
    <StyledYearOption>
      {allYears.map((year: number, index: number) => (
        <CategoryButton
          selected={year === selectedYear.value}
          onClick={() => {
            selectedYear.value = year;
            // selectedTimeCycleIndex.value = allYears.reverse().indexOf(year)
            menu.value = null;
          }}
          backgroundcoloronselect={theme?.clicked}
          key ={index}
        >
          <div className="wrapper">
            <div key={index} className="height"></div>
            <span>{year}</span>
            <div className="height"></div>
          </div>
        </CategoryButton>
      ))}
    </StyledYearOption>
  );
}
