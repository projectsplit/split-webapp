import { forwardRef } from 'react';
import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from '../../../interfaces';
import { StyledCalendarOptionsButton } from './CalendarOptionsButton.styled';

const CalendarOptionsButton = forwardRef<
  HTMLDivElement,
  OptionsButtonProps & CalendarOptionsButtonProps
>(({ children, onClick, isactive }, ref) => {
  return (
    <StyledCalendarOptionsButton
      ref={ref}
      onClick={onClick}
      isactive={isactive}
    >
      {children}
    </StyledCalendarOptionsButton>
  );
});

export default CalendarOptionsButton;
