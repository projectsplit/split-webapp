import { ExpenseResponseItem } from '@/types';
import { Signal } from '@preact/signals-react';
interface NavigateToExpenseConfirmationProps {
    menu: Signal<string | null>;
    selectedExpense: Signal<ExpenseResponseItem | null>;
    errorMessage: Signal<string | null>;
}
export declare const NavigateToExpenseConfirmation: ({ menu, selectedExpense, errorMessage, }: NavigateToExpenseConfirmationProps) => import("react/jsx-runtime").JSX.Element;
export {};
