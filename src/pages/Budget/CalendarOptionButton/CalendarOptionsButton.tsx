import React from "react";

import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from "../../../interfaces";
import { StyledCalendarOptionsButton } from "./CalendarOptionsButton.styled";

export default function CalendarOptionsButton({
  children,
  onClick,
  isactive,
}: OptionsButtonProps & CalendarOptionsButtonProps) {
  return (
    <StyledCalendarOptionsButton onClick={onClick} isactive={isactive} >
      {children}
    </StyledCalendarOptionsButton>
  );
}
