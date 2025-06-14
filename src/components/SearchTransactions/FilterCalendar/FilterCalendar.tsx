import { useEffect, useRef, useState } from "react";
import { FilterCalendarProps } from "../../../interfaces";
import DateTimePicker from "../../DateTimePicker/DateTimePicker";

export default function FilterCalendar({
  calendarIsOpen,
  showOptions,
  datePeriodClicked,
  timeZoneId,
}: FilterCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    new Date().toISOString()
  );

  const closeCalendar = (event: any) => {
    if (!calendarRef.current) return;
    if (calendarRef.current.contains(event.target)) return;
    calendarIsOpen.value = false;
    showOptions.value = true;
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => closeCalendar(e));
    return () => {
      document.removeEventListener("mousedown", (e) => closeCalendar(e));
    };
  }, []);

  return (
    <div ref={calendarRef}>
      {calendarIsOpen.value && (
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          timeZoneId={timeZoneId}
          showTimeControls={false}
          datePeriodClicked={datePeriodClicked}
          calendarIsOpen={calendarIsOpen}
          showOptions={showOptions}
          withLexicalContext={true}
        />
      )}
    </div>
  );
}
