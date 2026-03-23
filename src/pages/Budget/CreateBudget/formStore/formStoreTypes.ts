import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';

export interface CreateBudgetState {
  amount: string;
  description: string;
  currencySymbol: string;
  displayedAmount: Signal<string>;
  openCalendar: Signal<boolean>;
  openCustomDateCalendar: Signal<boolean>;
  startDate: Signal<string>;
  endDate: Signal<string>;
  pickingTarget: Signal<'start' | 'end' | null>;
  calendarDay: Signal<string>;
  budgetFrequency: Signal<Frequency>;
  hasSwitchedBudgetType: Signal<boolean>;
  scopeState: Signal<{
    none: boolean;
    personal: boolean;
    group: boolean;
    nonGroup: boolean;
  }>;
  targetGroupIds: Signal<string[]>;
  allGroupsSelected: Signal<boolean>;

  errors: {
    amountError: string;
    descriptionError: string;
    spendingCycleError: string;
    scopeError: string;
    showAmountError: boolean;
    showDescriptionError: boolean;
    showSpendingCycleError: boolean;
    showScopeError: boolean;
    commencementDayError: string;
    showCommencementDayError: boolean;
  };

  serverErrors: Signal<any[]>;
  currentStep: number;

  isEditMode: boolean;
  budgetId: string;

  // Actions
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  setCurrencySymbol: (symbol: string) => void;
  setStep: (step: number) => void;

  setError: (
    key: keyof CreateBudgetState['errors'],
    value: string | boolean
  ) => void;

  validateForm: (
    step: number,
    options?: { showErrors: boolean }
  ) => {
    isValid: boolean;
    errors: {
      amountError: string;
      descriptionError: string;
      spendingCycleError: string;
      scopeError: string;
      commencementDayError: string;
    };
  };

  submitBudget: (inputs: {
    createBudgetMutation?: any;
    updateBudgetMutation?: any;
    menu: Signal<string | null>;
    step: number;
    activate?: boolean;
  }) => Promise<{
    isValid: boolean;
    errors?: any;
  }>;

  resetForm: () => void;

  initForm: (currency: string) => void;

  populateForm: (budget: any, currencySymbol: string) => void;
}

