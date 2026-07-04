import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';
export declare const validateBudgetForm: (amount: string, description: string, scopeState: Signal<{
    none: boolean;
    personal: boolean;
    group: boolean;
    nonGroup: boolean;
}>, step: number, budgetFrequency: Signal<Frequency>, targetGroupIds?: Signal<string[]>, startDate?: Signal<string>, endDate?: Signal<string>, commencementDay?: Signal<string>) => {
    amountError: string;
    descriptionError: string;
    spendingCycleError: string;
    scopeError: string;
    commencementDayError: string;
};
