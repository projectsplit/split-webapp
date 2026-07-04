import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem } from '@/types';
interface NavigateToExpenseAnimationProps {
    menu: Signal<string | null>;
    selectedExpense: Signal<ExpenseResponseItem | null>;
    errorMessage: Signal<string | null>;
}
export default function NavigateToExpenseAnimation({ menu, selectedExpense, errorMessage, }: NavigateToExpenseAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
