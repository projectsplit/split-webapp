import { StyledCalendar } from './Calendar.styled';
import { Frequency } from '../../../types';
import { CalendarProps } from '../../../interfaces';

export default function Calendar({
  children,
  budgetFrequency,
  calendarDay,
  setError,
}: CalendarProps) {
  const handleElementClick = (day: string) => {
    setError('spendingCycleError', '');
    setError('showSpendingCycleError', false);
    setError('commencementDayError', '');
    setError('showCommencementDayError', false);
    calendarDay.value = day;
  };

  return (
    <StyledCalendar as="div" $budgetFrequency={budgetFrequency}>
      {budgetFrequency.value == Frequency.Monthly
        ? children.map((row: any, rowIndex: any) => (
            <div key={rowIndex} className="calendar-row">
              {row.map((day: string, dayIndex: number) => (
                <div
                  key={day + dayIndex}
                  className={`calendar-day ${
                    day === calendarDay.value && day !== '' ? 'selected' : ''
                  }`}
                  style={{ cursor: day !== '' ? 'pointer' : 'default' }}
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
                day === calendarDay.value && day !== '' ? 'selected' : ''
              }`}
              style={{ cursor: day !== '' ? 'pointer' : 'default' }}
              onClick={() => handleElementClick(day)}
            >
              {day}
            </div>
          ))}
    </StyledCalendar>
  );
}
