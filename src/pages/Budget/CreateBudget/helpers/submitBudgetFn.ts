import { CreateBudgetRequest, Frequency } from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient, UseMutationResult } from '@tanstack/react-query';
import { scopeBuilder } from './scopeBuilder';

export const submitBudgetFn = async (
  budgetFrequency: Signal<Frequency>,
  createBudget: UseMutationResult<any, any, CreateBudgetRequest, unknown>,
  amount: string,
  currencySymbol: string,
  calendarDay: Signal<string>,
  startDate: Signal<string>,
  endDate: Signal<string>,
  submitBudgetErrors: Signal<any[]>,
  openCalendar: Signal<boolean>,
  hasSwitchedBudgetType: Signal<boolean>,
  displayedAmount: Signal<string>,
  menu: Signal<string | null>,
  setAmount: (amount: string) => void,
  queryClient: QueryClient,
  budgetInfoQueryKey: string[],
  scopeState: Signal<{ personal: boolean; group: boolean; nonGroup: boolean }>,
  allGroupsSelected: Signal<boolean>,
  targetGroupIds: Signal<string[]>
) => {
  const { flags } = scopeBuilder(scopeState, allGroupsSelected, targetGroupIds);

  const baseRequest = {
    amount: amount,
    frequency: budgetFrequency.value,
    currency: currencySymbol,
    scope: flags,
    targetGroupIds: targetGroupIds.value,
  };

  if (budgetFrequency.value === Frequency.Monthly) {
    createBudget.mutate({
      ...baseRequest,
      commencementDay: calendarDay.value.toString(),

    });
  }
  if (budgetFrequency.value === Frequency.Weekly) {
    createBudget.mutate({
      ...baseRequest,
      commencementDay: getDayNumber(calendarDay.value),
    });
  }
  if (budgetFrequency.value === Frequency.Custom) {
    createBudget.mutate({
      ...baseRequest,
      commencementDay: null,
      startDate: startDate.value,
      endDate: endDate.value,
    });
  }

  submitBudgetErrors.value = [];
  openCalendar.value = false;
  queryClient.invalidateQueries({ queryKey: budgetInfoQueryKey, exact: false });
  hasSwitchedBudgetType.value = false;
  displayedAmount.value = '';
  menu.value = null;
  setAmount('');
  startDate.value = '';
  endDate.value = '';
};

const getDayNumber = (day: string): string | null => {
  const index = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(day);
  if (index !== -1) return (index + 1).toString();
  return null;
};
