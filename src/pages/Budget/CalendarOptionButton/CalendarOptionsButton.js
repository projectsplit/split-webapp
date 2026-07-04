import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { StyledCalendarOptionsButton } from './CalendarOptionsButton.styled';
const CalendarOptionsButton = forwardRef(({ children, onClick, isactive }, ref) => {
    return (_jsx(StyledCalendarOptionsButton, { ref: ref, onClick: onClick, "$isactive": isactive, children: children }));
});
export default CalendarOptionsButton;
