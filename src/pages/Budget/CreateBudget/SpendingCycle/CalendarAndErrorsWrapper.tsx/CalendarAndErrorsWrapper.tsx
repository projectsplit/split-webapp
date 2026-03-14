import { StyledCalendarAndErrorsWrapper } from './CalendarAndErrorsWrapper.styled';
import { CalendarAndErrorsWrapperProps } from '../../../../../interfaces';
import { Frequency } from '@/types';
import { getOrdinalSuffix } from '@/helpers/getOrdinalSuffix';
import SpendingCycleSelector from '@/pages/Budget/SpendingCycleSelector/SpendingCycleSelector';
import { getWeekday } from '@/helpers/getWeekDay';

export const CalendarAndErrorsWrapper = ({
  openCalendar,
  budgetFrequency,
  calendarDay,
  submitBudgetErrors,
  startDate,
  endDate,
  openCustomDateCalendar,
  pickingTarget,
}: CalendarAndErrorsWrapperProps) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const getDayNumber = (day: string): string | null => {
    const index = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  return (
    <StyledCalendarAndErrorsWrapper>
      <SpendingCycleSelector
        onClick={() => {
          openCalendar.value = !openCalendar.value;
        }}
        open={openCalendar.value}
        inputError={
          Array.isArray(submitBudgetErrors.value) &&
          submitBudgetErrors.value.find(
            (item) => item.field === 'Day' || item.field === 'budgetFrequency'
          )
        }
      >
        {budgetFrequency.value === Frequency.Custom ? (
          !startDate.value ? (
            <div
              className="prompt"
              onClick={(e) => {
                e.stopPropagation();
                pickingTarget.value = 'start';
                openCustomDateCalendar.value = true;
              }}
            >
              select start date
            </div>
          ) : !endDate.value ? (
            <div className="customPropmtPills">
              <div
                className="pill"
                onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = 'start';
                  openCustomDateCalendar.value = true;
                }}
              >
                <span className="date">{formatDate(startDate.value)}</span>
              </div>{' '}
              -{' '}
              <div
                className="prompt"
                onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = 'end';
                  openCustomDateCalendar.value = true;
                }}
              >
                select end date
              </div>
            </div>
          ) : (
            <div className="customPropmtPills">
              <div
                className="pill"
                onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = 'start';
                  openCustomDateCalendar.value = true;
                }}
              >
                <span className="date">{formatDate(startDate.value)}</span>
              </div>{' '}
              -{' '}
              <div
                className="pill"
                onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = 'end';
                  openCustomDateCalendar.value = true;
                }}
              >
                <span className="date">{formatDate(endDate.value)}</span>
              </div>
            </div>
          )
        ) : calendarDay.value === '' ? (
          budgetFrequency.value === Frequency.Monthly ? (
            'Monthly'
          ) : (
            'Weekly'
          )
        ) : budgetFrequency.value === Frequency.Monthly ? (
          <div className="monthlyPropmt">
            Monthly on the {calendarDay.value}{' '}
            <sup className="sup">{getOrdinalSuffix(calendarDay.value)}</sup>
          </div>
        ) : (
          <>Weekly on {getWeekday(getDayNumber(calendarDay.value))}</>
        )}
      </SpendingCycleSelector>
      {Array.isArray(submitBudgetErrors.value) &&
        submitBudgetErrors.value.find(
          (item) => item.field === 'Day' || item.field === 'budgetFrequency'
        ) && (
          <span className="errorMsg">
            {
              submitBudgetErrors.value.find(
                (item) =>
                  item.field === 'Day' || item.field === 'budgetFrequency'
              ).errorMessage
            }
          </span>
        )}
    </StyledCalendarAndErrorsWrapper>
  );
};
