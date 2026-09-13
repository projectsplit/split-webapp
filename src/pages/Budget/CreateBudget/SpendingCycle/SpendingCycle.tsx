import React, { useRef } from 'react';
import { StyledSpendingCycle } from './SpendingCycle.styled';
import IonIcon from '@reacticons/ionicons';
import Calendar from '../../Calendar/Calendar';
import { Frequency } from '../../../../types';
import { SpendingCycleProps } from '../../../../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarAndErrorsWrapper } from './CalendarAndErrorsWrapper/CalendarAndErrorsWrapper';
import { calendarTypeHandlerFn } from './helpers/calendarTypeHandlerFn';
import BottomDatePicker from '../../BottomDatePicker/BottomDatePicker';
import { getOrdinalSuffix } from '@/helpers/getOrdinalSuffix';
import { getWeekday } from '@/helpers/getWeekDay';

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
  const weekDayCodes = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const daysArray = weekDayCodes;
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

  const cycleNote = () => {
    if (budgetFrequency.value === Frequency.Custom) {
      if (!startDate.value || !endDate.value) return '';
      return `Runs from 00:00:00 on ${new Date(
        startDate.value
      ).toLocaleDateString()} until 23:59:59 on ${new Date(
        endDate.value
      ).toLocaleDateString()}.`;
    }

    if (!calendarDay.value) return '';

    if (budgetFrequency.value === Frequency.Monthly) {
      const day = parseInt(calendarDay.value, 10);
      if (day === 1) {
        return 'Runs from 00:00:00 on the 1st of one month until 23:59:59 on the last day of that month.';
      }
      const previous = (day - 1).toString();
      return `Runs from 00:00:00 on the ${day}${getOrdinalSuffix(
        calendarDay.value
      )} of one month until 23:59:59 on the ${previous}${getOrdinalSuffix(
        previous
      )} of the next.`;
    }

    const dayNumber = weekDayCodes.indexOf(calendarDay.value) + 1;
    if (dayNumber < 1) return '';
    const previous = dayNumber === 1 ? 7 : dayNumber - 1;
    return `Runs from 00:00:00 on ${getWeekday(
      dayNumber.toString()
    )} until 23:59:59 on the following ${getWeekday(previous.toString())}.`;
  };

  return (
    <StyledSpendingCycle $calendarIsOpen={openCalendar.value}>
      <div className="cycleSection">
        <div className="sectionHeader">
          <div className="prompt">Spending cycle</div>
          <IonIcon
            onClick={() => (menu.value = 'infoBox')}
            name="information-circle-outline"
            className="information"
          />
        </div>
        <div className="cycleSegments">
          {[
            { label: 'Weekly', frequency: Frequency.Weekly },
            { label: 'Monthly', frequency: Frequency.Monthly },
            { label: 'Custom', frequency: Frequency.Custom },
          ].map(({ label, frequency }) => (
            <div
              key={label}
              ref={frequency === Frequency.Custom ? customButtonRef : undefined}
              className={`segment ${
                budgetFrequency.value === frequency ? 'active' : ''
              }`}
              onClick={() => calendarTypeHandler(frequency)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="commencesSection">
        <div className="sectionHeader">
          <div className="prompt">Commences on</div>
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
        {cycleNote() ? <div className="sectionNote">{cycleNote()}</div> : null}
      </div>

      {openCalendar.value && budgetFrequency.value !== Frequency.Custom && (
        <Calendar
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
          <BottomDatePicker
            isOpen={openCustomDateCalendar}
            pickingTarget={pickingTarget}
            startDate={startDate}
            endDate={endDate}
            timeZoneId={timeZoneId}
            datePeriodClicked={calendarDay}
            setError={setError}
          />
        )}
    </StyledSpendingCycle>
  );
}
