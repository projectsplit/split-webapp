import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledDateDisplay } from './DateDisplay.styled';
import { toLuxon } from '../../../../utils';
import { FaCalendar } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
export default function DateDisplay({ selectedDateTime, timeZoneId, setTime, isDateShowing, setShowPicker, }) {
    return (_jsxs(StyledDateDisplay, { children: [' ', _jsx(FaCalendar, { className: "calendarIcon" }), _jsxs("div", { className: "dateAndClose", onClick: () => setShowPicker(true), children: [toLuxon(selectedDateTime, timeZoneId).toFormat('ccc, dd MMM yyyy HH:mm'), _jsx("div", { className: "closeButtonWrapper", children: _jsx(IoClose, { className: "closeButton", onClick: (e) => {
                                e.stopPropagation();
                                setTime(new Date().toISOString());
                                isDateShowing.value = false;
                            } }) })] })] }));
}
