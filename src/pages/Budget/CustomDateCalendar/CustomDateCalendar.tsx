import DateTimePicker from "@/components/DateTimePicker/DateTimePicker";
import { CustomDateCalendarProps } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import { StyledCustomDateCalendar } from "./CustomDateCalendar.styled";

export default function CustomDateCalendar({
  calendarIsOpen,
  datePeriodClicked,
  timeZoneId,
  startDate,
  endDate,
  pickingTarget,
}: CustomDateCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    new Date().toISOString()
  );

  const closeCalendar = (event: any) => {
    if (!calendarRef.current) return;
    if (calendarRef.current.contains(event.target)) return;
    calendarIsOpen.value = false;
    pickingTarget.value = null;
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => closeCalendar(e));
    return () => {
      document.removeEventListener("mousedown", (e) => closeCalendar(e));
    };
  }, []);

  const handleDateSelection = (newValue: string | ((prev: string) => string)) => {
    let finalValue = "";
    if (typeof newValue === "function") {
      finalValue = newValue(selectedDateTime);
    } else {
      finalValue = newValue;
    }

    setSelectedDateTime(finalValue);

    if (pickingTarget.value === "start") {
      startDate.value = finalValue;
    } else if (pickingTarget.value === "end") {
      endDate.value = finalValue;
    } else if (!startDate.value) {
      startDate.value = finalValue;
    } else {
      endDate.value = finalValue;
    }

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