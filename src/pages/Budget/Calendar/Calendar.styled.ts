import styled from "styled-components";
import { Frequency } from "../../../types";
import { Signal } from "@preact/signals-react";

interface StyledCalendarProps {
  budgettype: Signal<Frequency>;
}

export const StyledCalendar = styled.div<StyledCalendarProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.budgettype.value === Frequency.Monthly ? "column" : "row"};
  padding: 1rem 0.8rem;
  border-radius: 6px;
  gap: 10px;
  background-color: ${({ theme }) => theme.layer2};
  border-color: ${({ theme }) => theme.layer2};
  border-style: solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  overflow-wrap: break-word;
  .calendar-row {
    display: flex;
  }

  .calendar-day {
    flex: 1;

    border-radius: 6px;
    padding: 0.1rem;
    text-align: center;
    position: relative;

    &.selected {
      color: black;
      font-weight: bold;
    }
    &.selected:before {
      content: ""; 
      position: absolute;
      top: 50%;
      left: 50%; 
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background-color: ${({ theme }) => theme.whiteText};
      border-radius: 50%;
      z-index: -1; 
    }

    &.selected {
      z-index: 1;
    }
  }
`;
