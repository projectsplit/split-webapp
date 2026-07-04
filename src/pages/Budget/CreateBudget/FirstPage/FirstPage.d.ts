import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';
export declare const FirstPage: ({ menu, data, handleInputChangeCallback, actions, timeZoneId, }: FirstPageProps) => import("react/jsx-runtime").JSX.Element;
interface FirstPageProps {
    menu: Signal<string | null>;
    data: {
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
    };
    handleInputChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
    timeZoneId: string;
    actions: {
        setError: (key: 'amountError' | 'descriptionError' | 'spendingCycleError' | 'scopeError' | 'showAmountError' | 'showDescriptionError' | 'showSpendingCycleError' | 'showScopeError' | 'commencementDayError' | 'showCommencementDayError', value: string | boolean) => void;
    };
}
export {};
