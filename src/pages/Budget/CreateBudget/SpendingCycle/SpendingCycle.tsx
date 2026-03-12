import React, { useRef } from 'react';
import { StyledSpendingCycle } from './SpendingCycle.styled';
import IonIcon from '@reacticons/ionicons';
import CalendarOptionsButton from '../../CalendarOptionButton/CalendarOptionsButton';
import Calendar from '../../Calendar/Calendar';
import { Frequency } from '../../../../types';
import { SpendingCycleProps } from '../../../../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarAndErrorsWrapper } from './CalendarAndErrorsWrapper.tsx/CalendarAndErrorsWrapper';
import { calendarTypeHandlerFn } from './helpers/calendarTypeHandlerFn';
import CustomDateCalendar from '../../CustomDateCalendar/CustomDateCalendar';

export default function SpendingCycle({
  submitBudgetErrors,
  calendarDay,
  budgettype,
  menu,
  isStale,
  openCalendar,
  hasSwitchedBudgetType,
  timeZoneId,
  openCustomDateCalendar,
  startDate,
  endDate,
  pickingTarget,
}: SpendingCycleProps) {
  const queryClient = useQueryClient();
  const daysArray = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) =>
    weekIndex < 4
      ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
      : [29, 30, 31, '', '', '', '']
  );

  const calendarTypeHandler = (budgetType: Frequency) =>
    calendarTypeHandlerFn(
      budgetType,
      calendarDay,
      budgettype,
      startDate,
      endDate,
      openCustomDateCalendar,
      pickingTarget,
      hasSwitchedBudgetType,
      queryClient,
      isStale
    );

  React.useEffect(() => {
    if (
      budgettype.value === Frequency.Custom &&
      startDate.value !== '' &&
      endDate.value === '' &&
      !openCustomDateCalendar.value
    ) {
      openCustomDateCalendar.value = true;
      pickingTarget.value = 'end';
    }
  }, [startDate.value]);

  return (
    <StyledSpendingCycle>
      <div className="spendingCycleHeader">
        <div className="prompt">Select your spending cycle</div>
        <IonIcon
          onClick={() => (menu.value = 'infoBox')}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <CalendarAndErrorsWrapper
        openCalendar={openCalendar}
        budgettype={budgettype}
        calendarDay={calendarDay}
        submitBudgetErrors={submitBudgetErrors}
        startDate={startDate}
        endDate={endDate}
        openCustomDateCalendar={openCustomDateCalendar}
        pickingTarget={pickingTarget}
      />
      <div className="categoryButtons">
        {openCalendar.value && (
          <>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Monthly);
              }}
              isactive={budgettype.value === Frequency.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Weekly);
              }}
              isactive={budgettype.value === Frequency.Weekly}
            >
              Weekly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Custom);
              }}
              isactive={budgettype.value === Frequency.Custom}
            >
              Custom
            </CalendarOptionsButton>
          </>
        )}
      </div>

      {openCalendar.value && budgettype.value !== Frequency.Custom && (
        <Calendar
          // setCalendarDay={setCalendarDay}
          budgettype={budgettype}
          calendarDay={calendarDay}
        >
          {budgettype.value === Frequency.Monthly ? monthDaysArray : daysArray}
        </Calendar>
      )}
      {openCustomDateCalendar.value &&
        budgettype.value === Frequency.Custom && (
          <CustomDateCalendar
            calendarIsOpen={openCustomDateCalendar}
            datePeriodClicked={calendarDay}
            timeZoneId={timeZoneId}
            startDate={startDate}
            endDate={endDate}
            pickingTarget={pickingTarget}
          />
        )}
    </StyledSpendingCycle>
  );
}
