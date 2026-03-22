import { signal } from '@preact/signals-react';
import { CreateBudgetState } from './formStoreTypes';
import { create } from 'zustand';
import { Frequency } from '@/types';
import { validateBudgetForm } from '../helpers/validateBudgetForm';
import { scopeBuilder } from '../helpers/scopeBuilder';

// Signals created at module level to avoid @preact/signals-react-transform
// injecting React hooks inside the Zustand create() callback.
const _displayedAmount = signal<string>('');
const _openCalendar = signal<boolean>(false);
const _openCustomDateCalendar = signal<boolean>(false);
const _startDate = signal<string>('');
const _endDate = signal<string>('');
const _pickingTarget = signal<'start' | 'end' | null>(null);
const _calendarDay = signal<string>('');
const _budgetFrequency = signal<Frequency>(Frequency.Monthly);
const _hasSwitchedBudgetType = signal<boolean>(false);
const _scopeState = signal<{
  none: boolean;
  personal: boolean;
  group: boolean;
  nonGroup: boolean;
}>({
  none: false,
  personal: true,
  group: true,
  nonGroup: true,
});
const _targetGroupIds = signal<string[]>([]);
const _allGroupsSelected = signal<boolean>(true);
const _serverErrors = signal<any[]>([]);

const createBudgetStore = create<CreateBudgetState>()((set, get) => ({
  amount: '',
  description: '',
  currencySymbol: '',
  displayedAmount: _displayedAmount,
  openCalendar: _openCalendar,
  openCustomDateCalendar: _openCustomDateCalendar,
  startDate: _startDate,
  endDate: _endDate,
  pickingTarget: _pickingTarget,
  calendarDay: _calendarDay,
  budgetFrequency: _budgetFrequency,
  hasSwitchedBudgetType: _hasSwitchedBudgetType,
  scopeState: _scopeState,
  targetGroupIds: _targetGroupIds,
  allGroupsSelected: _allGroupsSelected,
  currentStep: 1,

  errors: {
    amountError: '',
    descriptionError: '',
    spendingCycleError: '',
    scopeError: '',
    commencementDayError: '',
    showAmountError: false,
    showDescriptionError: false,
    showSpendingCycleError: false,
    showScopeError: false,
    showCommencementDayError: false,
  },
  serverErrors: _serverErrors,

  setAmount: (amount: string) => set({ amount }),
  setDescription: (description: string) => set({ description }),
  setCurrencySymbol: (symbol: string) => set({ currencySymbol: symbol }),
  setStep: (step: number) => set({ currentStep: step }),

  setError: (key: keyof CreateBudgetState['errors'], value: string | boolean) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [key]: value,
      },
    })),

  validateForm: (step: number, options = { showErrors: true }) => {
    const {
      amount,
      description,
      scopeState,
      budgetFrequency,
      targetGroupIds,
      startDate,
      endDate,
      calendarDay,
    } = get();

    const {
      amountError,
      descriptionError,
      spendingCycleError,
      scopeError,
      commencementDayError,
    } = validateBudgetForm(
      amount,
      description,
      scopeState,
      step,
      budgetFrequency,
      targetGroupIds,
      startDate,
      endDate,
      calendarDay
    );

    const isValid =
      !amountError &&
      !descriptionError &&
      !spendingCycleError &&
      !scopeError &&
      !commencementDayError;

    if (options.showErrors) {
      set((s) => ({
        errors: {
          ...s.errors,
          amountError,
          descriptionError,
          spendingCycleError,
          scopeError,
          commencementDayError,
          showAmountError: !!amountError,
          showDescriptionError: !!descriptionError,
          showSpendingCycleError: !!spendingCycleError,
          showScopeError: !!scopeError,
          showCommencementDayError: !!commencementDayError,
        },
      }));
    }

    return {
      isValid,
      errors: {
        amountError,
        descriptionError,
        spendingCycleError,
        scopeError,
        commencementDayError,
      },
    };
  },

  submitBudget: async ({ createBudgetMutation, menu, step, activate }) => {
    const { isValid, errors } = get().validateForm(step);
    if (!isValid) return { isValid, errors };

    get().serverErrors.value = [];

    // Logic from submitBudgetFn
    const {
      amount,
      description,
      budgetFrequency,
      currencySymbol,
      scopeState,
      allGroupsSelected,
      targetGroupIds,
      calendarDay,
      startDate,
      endDate,
      displayedAmount,
      openCalendar,
      hasSwitchedBudgetType,
    } = get();

    const { flags } = scopeBuilder(
      scopeState,
      allGroupsSelected,
      targetGroupIds
    );

    const baseRequest = {
      amount,
      description,
      frequency: budgetFrequency.value,
      currency: currencySymbol,
      scope: flags,
      targetGroupIds: targetGroupIds.value,
      activate,
    };

    if (budgetFrequency.value === Frequency.Monthly) {
      await createBudgetMutation({
        ...baseRequest,
        commencementDay: calendarDay.value.toString(),
      });
    } else if (budgetFrequency.value === Frequency.Weekly) {
      const getDayNumber = (day: string): string | null => {
        const index = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(day);
        return index !== -1 ? (index + 1).toString() : null;
      };
      await createBudgetMutation({
        ...baseRequest,
        commencementDay: getDayNumber(calendarDay.value),
      });
    } else if (budgetFrequency.value === Frequency.Custom) {
      await createBudgetMutation({
        ...baseRequest,
        commencementDay: null,
        startDate: startDate.value,
        endDate: endDate.value,
      });
    }

    openCalendar.value = false;
    hasSwitchedBudgetType.value = false;
    displayedAmount.value = '';
    menu.value = null;
    get().resetForm();

    return { isValid: true };
  },

  resetForm: () => {
    const {
      displayedAmount,
      openCalendar,
      openCustomDateCalendar,
      startDate,
      endDate,
      pickingTarget,
      calendarDay,
      budgetFrequency,
      hasSwitchedBudgetType,
      scopeState,
      targetGroupIds,
      allGroupsSelected,
      serverErrors,
    } = get();

    displayedAmount.value = '';
    openCalendar.value = false;
    openCustomDateCalendar.value = false;
    startDate.value = '';
    endDate.value = '';
    pickingTarget.value = null;
    calendarDay.value = '';
    budgetFrequency.value = Frequency.Monthly;
    hasSwitchedBudgetType.value = false;
    scopeState.value = {
      none: false,
      personal: true,
      group: true,
      nonGroup: true,
    };
    targetGroupIds.value = [];
    allGroupsSelected.value = true;
    serverErrors.value = [];

    set({
      amount: '',
      description: '',
      currencySymbol: '',
      currentStep: 1,
      errors: {
        amountError: '',
        descriptionError: '',
        spendingCycleError: '',
        scopeError: '',
        commencementDayError: '',
        showAmountError: false,
        showDescriptionError: false,
        showSpendingCycleError: false,
        showScopeError: false,
        showCommencementDayError: false,
      },
    });
  },
  initForm: (currency: string) => {
    get().resetForm();
    set({ currencySymbol: currency });
  },
}));

// Re-export with `use` prefix for hook consumers.
// The raw store is named without `use` to prevent @preact/signals-react-transform
// from injecting React hooks into the Zustand create() callback.
export const useCreateBudgetStore = createBudgetStore;
