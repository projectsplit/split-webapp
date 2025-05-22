import { styled } from "styled-components";
import { DateTime as LuxonDateTime } from "luxon";
import { DayPickerProps } from "../../../interfaces";

const DayPicker = (props: DayPickerProps) => {
  const { selectedDateTime, dispatch, timeZoneId } = props;

  const selectedDt = LuxonDateTime.fromISO(selectedDateTime, {
    zone: timeZoneId,
  });

  const now = LuxonDateTime.now().setZone(timeZoneId);

  const { month, year } = selectedDt;

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDayNames = (offset: number): string[] => {
    return Array.from({ length: 7 }, (_, i) => dayNames[(i + offset) % 7]);
  };

  const firstDayOfMonth = LuxonDateTime.fromObject(
    { year, month, day: 1 },
    { zone: timeZoneId }
  );

  const calendarStart = firstDayOfMonth.minus({
    days: firstDayOfMonth.weekday % 7,
  });

  const calendarGrid = Array.from({ length: 6 }, (_, i) =>
    Array.from({ length: 7 }, (_, j) => calendarStart.plus({ days: i * 7 + j }))
  );

  const onDayClick = (day: LuxonDateTime) => {
    const oldDt = LuxonDateTime.fromISO(selectedDateTime, { zone: timeZoneId });
    const newDt = day.set({
      hour: oldDt.hour,
      minute: oldDt.minute,
      second: oldDt.second,
    });
    dispatch({
      type: "SET_EXPENSE_TIME",
      payload: newDt.toISO()!,
    });
  };

  return (
    <StyledDayPicker>
      <div className="names-row">
        {getDayNames(0).map((n) => (
          <div key={n} className="day-name">
            {n}
          </div>
        ))}
      </div>

      <div className="month-grid">
        {calendarGrid.map((week, i) => (
          <div key={i} className="week-row">
            {week.map((day, j) => {
              const isInactive = day.month !== month;
              const isToday = day.hasSame(now, "day");
              const isSelected = day.hasSame(selectedDt, "day");

              return (
                <div
                  key={j}
                  className={`day${isInactive ? " inactive" : ""}${
                    isToday ? " today" : ""
                  }${isSelected ? " selected" : ""}`}
                  onClick={() => onDayClick(day)}
                >
                  {day.day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </StyledDayPicker>
  );
};

export default DayPicker;

const StyledDayPicker = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default;

  .names-row {
    display: flex;
    /* width: max-content; */
    gap: 0.3em;

    .day-name {
      color: #88888b;
      display: flex;
      gap: 0.3em;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 2em;
      height: 2em;
    }
  }

  .month-grid {
    display: flex;
    flex-direction: column;
    gap: 0.3em;

    .week-row {
      display: flex;
      gap: 0.3em;

      .inactive {
        color: #555558;
      }

      .day {
        display: flex;
        /* flex-shrink: 0; */
        justify-content: center;
        align-items: center;
        width: 2em;
        height: 2em;
        border-radius: 4px;
        cursor: pointer;

        @media (hover: hover) {
          &:hover {
            background-color: #34383c;
          }
        }
      }

      .selected {
        background-color: ${({ theme }) => theme.highlightColor};

        &:hover {
          background-color: ${({ theme }) => theme.highlightColor};
        }
      }

      .today {
        border: 1px solid #34383c;
      }
    }
  }
`;
