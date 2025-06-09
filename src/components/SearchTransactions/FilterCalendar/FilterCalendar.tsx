import { useEffect, useRef } from "react";
import { StyledFilterCalendar } from "./FilterCalendar.styled";
import { useSignal } from "@preact/signals-react";
import { generateMonthDaysArray } from "../helpers/generateMonthDaysArray";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { removeWordFromEditor } from "../helpers/removeWordFromEditor";
import { enhanceNumberArray } from "../../../helpers/enhanceNumberArray";
import { getAllDaysInMonth } from "../../../helpers/monthlyDataHelpers";
import { initialiseSelectedTimeCycle } from "../../../helpers/initialiseSelectedTimeCycle";
import { useWeeklyDatesMemo } from "../hooks/useWeeklyDatesMemo";
import { months } from "../../../constants";
import { FilterCalendarProps } from "../../../interfaces";

export default function FilterCalendar({
  calendarIsOpen,
  showOptions,
  datePeriodClicked,
}: FilterCalendarProps) {
  const calendarDay = useSignal<string>(new Date().getDate().toString());
  const selectedYear = useSignal<number>(new Date().getFullYear());
  const month = useSignal<number>(new Date().getMonth());
  const calendarRef = useRef<HTMLDivElement>(null);
  const { insertMention } =
    useBeautifulMentions();
  const [editor] = useLexicalComposerContext();
  const [
    allWeeksPerYear,
    wksToDateString,
    monthsAndDaysArrays,
    currentWeekIndex,
  ] = useWeeklyDatesMemo(selectedYear);

  const selectedTimeCycleIndex = useSignal<number>(
    initialiseSelectedTimeCycle(1, currentWeekIndex, selectedYear.value)
  );


  const handleDateClick = (day: string) => {
    if (day === "") return;
    switch (datePeriodClicked.value) {
      case "before":
        removeWordFromEditor(editor, "before:");
        insertMention({
          trigger: "before" + ":",
          value:
            day +
            "-" +
            (month.value + 1).toString() +
            "-" +
            selectedYear.value.toString(),
        });

        break;
      case "during":
        removeWordFromEditor(editor, "during:");
        insertMention({
          trigger: "during" + ":",
          value:
            day +
            "-" +
            (month.value + 1).toString() +
            "-" +
            selectedYear.value.toString(),
        });

        break;
      case "after":
        removeWordFromEditor(editor, "after:");
        insertMention({
          trigger: "after" + ":",
          value:
            day +
            "-" +
            (month.value + 1).toString() +
            "-" +
            selectedYear.value.toString(),
        });

        break;
      default:
        console.warn("Unknown period:", datePeriodClicked.value);
        break;
    }
    
    calendarIsOpen.value = false;
    showOptions.value = true;
  };

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const enhancedDatesToNumbers = enhanceNumberArray(
    allDaysInMonth.map((date) => date.getDate()),
    0
  );

  const daysOfMonth = generateMonthDaysArray(enhancedDatesToNumbers);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      calendarIsOpen.value = false;
      showOptions.value = true;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledFilterCalendar ref={calendarRef}>
      <div className="monthNameAndYear">
        {months[month.value]} {selectedYear.value}
      </div>
      {daysOfMonth.map((row: any, rowIndex: any) => (
        <div key={rowIndex} className="calendar-row">
          {row.map((day: string, dayIndex: number) => (
            <div
              key={day + dayIndex}
              className={`calendar-day ${
                day.toString() === calendarDay.value && day !== ""
                  ? "selected"
                  : ""
              }`}
              style={{ cursor: day !== "" ? "pointer" : "default" }}
              onClick={() => handleDateClick(day.toString())}
            >
              {day}
            </div>
          ))}
        </div>
      ))}
    </StyledFilterCalendar>
  );
}
