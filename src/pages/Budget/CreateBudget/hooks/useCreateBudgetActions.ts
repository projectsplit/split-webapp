import { useShallow } from 'zustand/react/shallow';
import { useCreateBudgetStore } from '../formStore/formStore';

export const useCreateBudgetActions = () => {
  return useCreateBudgetStore(
    useShallow((state) => ({
      setAmount: state.setAmount,
      setDescription: state.setDescription,
      setCurrencySymbol: state.setCurrencySymbol,

      setError: state.setError,
      validateForm: state.validateForm,
      submitBudget: state.submitBudget,
      resetForm: state.resetForm,
      initForm: state.initForm,
    }))
  );
};

export const useCreateBudgetData = () => {
  return useCreateBudgetStore(
    useShallow((state) => ({
      amount: state.amount,
      description: state.description,
      currencySymbol: state.currencySymbol,
      displayedAmount: state.displayedAmount,
      openCalendar: state.openCalendar,
      openCustomDateCalendar: state.openCustomDateCalendar,
      startDate: state.startDate,
      endDate: state.endDate,
      pickingTarget: state.pickingTarget,
      calendarDay: state.calendarDay,
      budgetFrequency: state.budgetFrequency,
      hasSwitchedBudgetType: state.hasSwitchedBudgetType,
      scopeState: state.scopeState,
      targetGroupIds: state.targetGroupIds,
      allGroupsSelected: state.allGroupsSelected,
      serverErrors: state.serverErrors,
      errors: state.errors,
    }))
  );
};
