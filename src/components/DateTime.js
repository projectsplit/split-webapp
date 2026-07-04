import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import DateTimePicker from './DateTimePicker/DateTimePicker';
import { styled } from 'styled-components';
import { DateTime as LuxonDateTime } from 'luxon';
import { toLuxon, toUtcString } from '../utils';
import { FaCalendar } from 'react-icons/fa';
export const DateTime = ({ selectedDateTime, setSelectedDateTime, timeZoneId, isEdit, withLexicalContext, category, isDateShowing, showPicker, setShowPicker, }) => {
    const [realtimeUpdate, setRealtimeUpdate] = useState(!isEdit);
    const ref = useRef(null);
    useEffect(() => {
        let interval;
        if (realtimeUpdate) {
            interval = setInterval(() => {
                setSelectedDateTime((prev) => {
                    const now = LuxonDateTime.utc().setZone(timeZoneId);
                    const updatedDateTime = toLuxon(prev, timeZoneId).set({
                        hour: now.hour,
                        minute: now.minute,
                        second: now.second,
                    });
                    return toUtcString(updatedDateTime);
                });
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [realtimeUpdate]);
    useEffect(() => {
        window.addEventListener('mousedown', (e) => closeTimePicker(e));
        return () => {
            window.removeEventListener('mousedown', closeTimePicker);
        };
    }, []);
    const closeTimePicker = (event) => {
        if (!ref.current)
            return;
        if (ref.current.contains(event.target))
            return;
        setShowPicker(false);
    };
    return (_jsxs(StyledDateTime, { ref: ref, children: [_jsx("div", { className: "main", onClick: (_) => {
                    (setShowPicker(!showPicker), (isDateShowing.value = true));
                }, children: _jsx(FaCalendar, { className: "calendarIcon" }) }), showPicker && (_jsx(DateTimePicker, { selectedDateTime: selectedDateTime, setSelectedDateTime: setSelectedDateTime, realtimeUpdate: realtimeUpdate, setRealtimeUpdate: setRealtimeUpdate, timeZoneId: timeZoneId, showTimeControls: true, withLexicalContext: withLexicalContext, category: category, isDateShowing: isDateShowing }))] }));
};
const StyledDateTime = styled.div `
  .main {
    cursor: pointer;
    .text {
      color: ${({ theme }) => theme.textActiveColor};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
