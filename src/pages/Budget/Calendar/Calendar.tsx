import { StyledCalendar } from "./Calendar.styled";
import { Frequency } from "../../../types";
import { CalendarProps } from "../../../interfaces";

export default function Calendar({
  children,
  budgettype,
  calendarDay,
}: CalendarProps) {

  const handleElementClick = (day: string) => {
    calendarDay.value = day;
  };

  return (
    <StyledCalendar as="div" budgettype={budgettype}>
      {budgettype.value == Frequency.Monthly
        ? children.map((row: any, rowIndex: any) => (
            <div key={rowIndex} className="calendar-row">
              {row.map((day: string, dayIndex: number) => (
                <div
                  key={day + dayIndex}
                  className={`calendar-day ${
                    day === calendarDay.value && day !== "" ? "selected" : ""
                  }`}
                  style={{ cursor: day !== "" ? "pointer" : "default" }}
                  onClick={() => handleElementClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          ))
        : children.map((day: string, dayIndex: number) => (
            <div
              key={day + dayIndex}
              className={`calendar-day ${
                day === calendarDay.value && day !== "" ? "selected" : ""
              }`}
              style={{ cursor: day !== "" ? "pointer" : "default" }}
              onClick={() => handleElementClick(day)}
            >
              {day}
            </div>
          ))}
    </StyledCalendar>
  );
}
