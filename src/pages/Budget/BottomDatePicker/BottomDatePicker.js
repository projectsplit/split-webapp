import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { StyledBottomDatePickerOverlay } from './BottomDatePicker.styled';
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker';
export default function BottomDatePicker({ isOpen, pickingTarget, startDate, endDate, timeZoneId, datePeriodClicked, setError, }) {
    const lastClickRef = useRef(null);
    const [selectedDateTime, setSelectedDateTime] = useState(pickingTarget.value === 'start' && startDate.value
        ? new Date(startDate.value).toISOString()
        : pickingTarget.value === 'end' && endDate.value
            ? new Date(endDate.value).toISOString()
            : new Date().toISOString());
    useEffect(() => {
        const handleMouseDown = (e) => {
            lastClickRef.current = e.target;
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);
    const close = () => {
        isOpen.value = false;
        pickingTarget.value = null;
    };
    const handleDateSelection = (newValue) => {
        let finalValue = '';
        if (typeof newValue === 'function') {
            finalValue = newValue(selectedDateTime);
        }
        else {
            finalValue = newValue;
        }
        setSelectedDateTime(finalValue);
        // Navigation clicks (month/year arrows) should not close
        if (lastClickRef.current?.closest('.top-menu')) {
            return;
        }
        if (pickingTarget.value === 'start') {
            startDate.value = finalValue;
        }
        else if (pickingTarget.value === 'end') {
            endDate.value = finalValue;
        }
        else if (!startDate.value) {
            startDate.value = finalValue;
        }
        else {
            endDate.value = finalValue;
        }
        setError('spendingCycleError', '');
        setError('showSpendingCycleError', false);
        setError('commencementDayError', '');
        setError('showCommencementDayError', false);
        close();
    };
    const title = pickingTarget.value === 'end' ? 'Select End Date' : 'Select Start Date';
    return (_jsxs(StyledBottomDatePickerOverlay, { children: [_jsx("div", { className: "backdrop", onClick: close }), _jsxs("div", { className: "sheet", children: [_jsx("div", { className: "sheet-header", children: _jsx("div", { className: "sheet-title", children: title }) }), _jsx("div", { className: "calendar-container", children: _jsx(DateTimePicker, { selectedDateTime: selectedDateTime, setSelectedDateTime: handleDateSelection, timeZoneId: timeZoneId, showTimeControls: false, datePeriodClicked: datePeriodClicked, calendarIsOpen: isOpen }) })] })] }));
}
