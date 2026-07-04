export declare const useCreateBudgetActions: () => {
    setAmount: (amount: string) => void;
    setDescription: (description: string) => void;
    setCurrencySymbol: (symbol: string) => void;
    setError: (key: keyof import("../formStore/formStoreTypes").CreateBudgetState["errors"], value: string | boolean) => void;
    validateForm: (step: number, options?: {
        showErrors: boolean;
    }) => {
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
        menu: import("@preact/signals-core").Signal<string | null>;
        step: number;
        activate?: boolean;
    }) => Promise<{
        isValid: boolean;
        errors?: any;
    }>;
    resetForm: () => void;
    initForm: (currency: string) => void;
    setStep: (step: number) => void;
    populateForm: (budget: any, currencySymbol: string) => void;
};
export declare const useCreateBudgetData: () => {
    amount: string;
    description: string;
    currencySymbol: string;
    displayedAmount: import("@preact/signals-core").Signal<string>;
    openCalendar: import("@preact/signals-core").Signal<boolean>;
    openCustomDateCalendar: import("@preact/signals-core").Signal<boolean>;
    startDate: import("@preact/signals-core").Signal<string>;
    endDate: import("@preact/signals-core").Signal<string>;
    pickingTarget: import("@preact/signals-core").Signal<"start" | "end" | null>;
    calendarDay: import("@preact/signals-core").Signal<string>;
    budgetFrequency: import("@preact/signals-core").Signal<import("../../../../types").Frequency>;
    hasSwitchedBudgetType: import("@preact/signals-core").Signal<boolean>;
    scopeState: import("@preact/signals-core").Signal<{
        none: boolean;
        personal: boolean;
        group: boolean;
        nonGroup: boolean;
    }>;
    targetGroupIds: import("@preact/signals-core").Signal<string[]>;
    allGroupsSelected: import("@preact/signals-core").Signal<boolean>;
    serverErrors: import("@preact/signals-core").Signal<any[]>;
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
    currentStep: number;
    isEditMode: boolean;
    budgetId: string;
};
