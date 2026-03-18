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
  calendarDay,
  budgetFrequency,
  menu,
  isStale,
  openCalendar,
  hasSwitchedBudgetType,
  timeZoneId,
  openCustomDateCalendar,
  startDate,
  endDate,
  pickingTarget,
  setError,
  $inputError,
}: SpendingCycleProps) {
  const queryClient = useQueryClient();
  const daysArray = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const customButtonRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLButtonElement>(null);

  const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) =>
    weekIndex < 4
      ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
      : [29, 30, 31, '', '', '', '']
  );

  const calendarTypeHandler = (frequency: Frequency) => {
    calendarTypeHandlerFn(
      frequency,
      calendarDay,
      budgetFrequency,
      startDate,
      endDate,
      openCustomDateCalendar,
      pickingTarget,
      hasSwitchedBudgetType,
      queryClient,
      isStale
    );
  };
  console.log(openCalendar.value);
  React.useEffect(() => {
    if (
      budgetFrequency.value === Frequency.Custom &&
      startDate.value !== '' &&
      endDate.value === '' &&
      !openCustomDateCalendar.value
    ) {
      openCustomDateCalendar.value = true;
      pickingTarget.value = 'end';
    }
  }, [startDate.value]);

  return (
    <StyledSpendingCycle $calendarIsOpen={openCalendar.value}>
      <div className="spendingCycleHeader">
        <div className="prompt">Spending cycle</div>
        <IonIcon
          onClick={() => (menu.value = 'infoBox')}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <CalendarAndErrorsWrapper
        openCalendar={openCalendar}
        budgetFrequency={budgetFrequency}
        calendarDay={calendarDay}
        startDate={startDate}
        endDate={endDate}
        openCustomDateCalendar={openCustomDateCalendar}
        pickingTarget={pickingTarget}
        selectorRef={selectorRef}
        $inputError={$inputError}
      />
      <div className="categoryButtons">
        {openCalendar.value && (
          <>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Monthly);
              }}
              isactive={budgetFrequency.value === Frequency.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Weekly);
              }}
              isactive={budgetFrequency.value === Frequency.Weekly}
            >
              Weekly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              ref={customButtonRef}
              onClick={() => {
                calendarTypeHandler(Frequency.Custom);
              }}
              isactive={budgetFrequency.value === Frequency.Custom}
            >
              Custom
            </CalendarOptionsButton>
          </>
        )}
      </div>

      {openCalendar.value && budgetFrequency.value !== Frequency.Custom && (
        <Calendar
          // setCalendarDay={setCalendarDay}
          budgetFrequency={budgetFrequency}
          calendarDay={calendarDay}
          setError={setError}
        >
          {budgetFrequency.value === Frequency.Monthly
            ? monthDaysArray
            : daysArray}
        </Calendar>
      )}
      {openCustomDateCalendar.value &&
        budgetFrequency.value === Frequency.Custom && (
          <CustomDateCalendar
            calendarIsOpen={openCustomDateCalendar}
            datePeriodClicked={calendarDay}
            timeZoneId={timeZoneId}
            startDate={startDate}
            endDate={endDate}
            pickingTarget={pickingTarget}
            setError={setError}
            excludeRefs={[customButtonRef, selectorRef]}
          />
        )}
    </StyledSpendingCycle>
  );
}
