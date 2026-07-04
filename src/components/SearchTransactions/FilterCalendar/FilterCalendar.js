import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import DateTimePicker from '../../DateTimePicker/DateTimePicker';
export default function FilterCalendar({ calendarIsOpen, showOptions, datePeriodClicked, timeZoneId, category, }) {
    const calendarRef = useRef(null);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date().toISOString());
    const closeCalendar = (event) => {
        if (!calendarRef.current)
            return;
        if (calendarRef.current.contains(event.target))
            return;
        calendarIsOpen.value = false;
        showOptions.value = true;
    };
    useEffect(() => {
        document.addEventListener('mousedown', (e) => closeCalendar(e));
        return () => {
            document.removeEventListener('mousedown', (e) => closeCalendar(e));
        };
    }, []);
    return (_jsx("div", { ref: calendarRef, children: calendarIsOpen.value && (_jsx(DateTimePicker, { selectedDateTime: selectedDateTime, setSelectedDateTime: setSelectedDateTime, timeZoneId: timeZoneId, showTimeControls: false, datePeriodClicked: datePeriodClicked, calendarIsOpen: calendarIsOpen, showOptions: showOptions, withLexicalContext: true, category: category })) }));
}
