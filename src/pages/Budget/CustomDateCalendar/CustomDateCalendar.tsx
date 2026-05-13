import DateTimePicker from '@/components/DateTimePicker/DateTimePicker';
import { CustomDateCalendarProps } from '@/interfaces';
import { useEffect, useRef, useState } from 'react';
import { StyledCustomDateCalendar } from './CustomDateCalendar.styled';

export default function CustomDateCalendar({
  calendarIsOpen,
  datePeriodClicked,
  timeZoneId,
  startDate,
  endDate,
  pickingTarget,
  setError,
  excludeRefs,
}: CustomDateCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const lastClickRef = useRef<HTMLElement | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    pickingTarget.value === 'start' && startDate.value
      ? new Date(startDate.value).toISOString()
      : pickingTarget.value === 'end' && endDate.value
        ? new Date(endDate.value).toISOString()
        : new Date().toISOString()
  );

  const closeCalendar = (event: MouseEvent) => {
    if (!calendarRef.current) return;
    if (calendarRef.current.contains(event.target as Node)) return;

    if (excludeRefs) {
      for (const ref of excludeRefs) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          return;
        }
      }
    }

    calendarIsOpen.value = false;
    pickingTarget.value = null;
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      lastClickRef.current = e.target as HTMLElement;
      closeCalendar(e);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleDateSelection = (
    newValue: string | ((prev: string) => string)
  ) => {
    let finalValue = '';
    if (typeof newValue === 'function') {
      finalValue = newValue(selectedDateTime);
    } else {
      finalValue = newValue;
    }

    setSelectedDateTime(finalValue);

    // If the click was on the navigation (top-menu), don't close the calendar
    if (lastClickRef.current?.closest('.top-menu')) {
      return;
    }

    if (pickingTarget.value === 'start') {
      startDate.value = finalValue;
    } else if (pickingTarget.value === 'end') {
      endDate.value = finalValue;
    } else if (!startDate.value) {
      startDate.value = finalValue;
    } else {
      endDate.value = finalValue;
    }
    setError('spendingCycleError', '');
    setError('showSpendingCycleError', false);
    setError('commencementDayError', '');
    setError('showCommencementDayError', false);
    calendarIsOpen.value = false;
    pickingTarget.value = null;
  };

  return (
    <StyledCustomDateCalendar ref={calendarRef}>
      {calendarIsOpen.value && (
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={handleDateSelection}
          timeZoneId={timeZoneId}
          showTimeControls={false}
          datePeriodClicked={datePeriodClicked}
          calendarIsOpen={calendarIsOpen}
        />
      )}
    </StyledCustomDateCalendar>
  );
}
