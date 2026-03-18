import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';

export const calendarTypeHandlerFn = (
  frequency: Frequency,
  calendarDay: Signal<string>,
  budgetFrequency: Signal<Frequency>,
  startDate: Signal<string>,
  endDate: Signal<string>,
  openCustomDateCalendar: Signal<boolean>,
  pickingTarget: Signal<'start' | 'end' | null>,
  hasSwitchedBudgetType: Signal<boolean>,
  queryClient: QueryClient,
  isStale: boolean
) => {
  if (calendarDay.value !== '' && frequency === budgetFrequency.value) {
    budgetFrequency.value = frequency;
  } else {
    budgetFrequency.value = frequency;
    calendarDay.value = '';
  }

  if (frequency === Frequency.Custom) {
    if (startDate.value === '' && endDate.value === '') {
      openCustomDateCalendar.value = true;
      pickingTarget.value = 'start';
    }
    if (
      startDate.value !== '' &&
      endDate.value === '' &&
      openCustomDateCalendar.value === false
    ) {
      openCustomDateCalendar.value = true;
      pickingTarget.value = 'end';
    }
  } else {
    openCustomDateCalendar.value = false;
    startDate.value = '';
    endDate.value = '';
  }

  if (!hasSwitchedBudgetType.value || isStale) {
    queryClient.invalidateQueries({ queryKey: ['budget'], exact: false });
  }
  if (!hasSwitchedBudgetType.value) {
    //setHasSwitchedBudgetType(true);
    hasSwitchedBudgetType.value = true;
  }
};
