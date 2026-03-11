import { Frequency } from "@/types";
import { Signal } from "@preact/signals-react";
import { QueryClient } from "@tanstack/react-query";

export const calendarTypeHandlerFn = (budgetType: Frequency,
  calendarDay: Signal<string>,
  budgettype: Signal<Frequency>,
  startDate: Signal<string>,
  endDate: Signal<string>,
  openCustomDateCalendar: Signal<boolean>,
  pickingTarget: Signal<"start" | "end" | null>,
  hasSwitchedBudgetType: Signal<boolean>,
  queryClient: QueryClient,
  isStale: boolean) => {
    
  if (calendarDay.value !== "" && budgetType === budgettype.value) {
    budgettype.value = budgetType;
  } else {
    budgettype.value = budgetType;
    calendarDay.value = "";
  }

  if (budgetType === Frequency.Custom) {
    if (startDate.value === "" && endDate.value === "") {
      openCustomDateCalendar.value = true;
      pickingTarget.value = "start";
    }
  } else {
    openCustomDateCalendar.value = false;
    startDate.value = "";
    endDate.value = "";
  }

  if (!hasSwitchedBudgetType.value || isStale) {
    queryClient.invalidateQueries({ queryKey: ["budget"], exact: false });
  }
  if (!hasSwitchedBudgetType.value) {
    //setHasSwitchedBudgetType(true);
    hasSwitchedBudgetType.value = true;
  }
};