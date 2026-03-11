import { CreateBudgetRequest, Frequency } from "@/types";
import { Signal } from "@preact/signals-react";
import { QueryClient, UseMutationResult } from "@tanstack/react-query";

export const submitBudgetFn = async (budgettype: Signal<Frequency>,
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
) => {
  if (budgettype.value === Frequency.Monthly) {
    createBudget.mutate({
      amount: amount,
      budgetType: budgettype.value,
      currency: currencySymbol,
      day: calendarDay.value.toString(),
    });
  }
  if (budgettype.value === Frequency.Weekly) {
    createBudget.mutate({
      amount: amount,
      budgetType: budgettype.value,
      currency: currencySymbol,
      day: getDayNumber(calendarDay.value),
    });
  }
  if (budgettype.value === Frequency.Custom) {
    createBudget.mutate({
      amount: amount,
      budgetType: budgettype.value,
      currency: currencySymbol,
      day: null,
      startDate: startDate.value,
      endDate: endDate.value,
    });
  }

  submitBudgetErrors.value = [];
  openCalendar.value = false;
  queryClient.invalidateQueries({ queryKey: budgetInfoQueryKey, exact: false });
  hasSwitchedBudgetType.value = false;
  displayedAmount.value = "";
  menu.value = null;
  setAmount("");
  startDate.value = "";
  endDate.value = "";
};

const getDayNumber = (day: string): string | null => {
  const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
  if (index !== -1) return (index + 1).toString();
  return null;
};