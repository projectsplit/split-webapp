import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem } from '@/types';
export declare const useCenterToExpense: (scrollAreaRef: React.RefObject<HTMLDivElement>, isScrolled: Signal<boolean>, expenses: ExpenseResponseItem[] | undefined, jumpToken?: string, isFetchingPreviousPage?: boolean) => void;
