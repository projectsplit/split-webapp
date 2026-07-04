import { ExpenseFilter, TransferFilter } from '../../../types';
export declare const getFilterStorageKey: (type: "expense" | "transfer", groupId?: string, isPersonal?: boolean) => string;
export declare const localStorageStringParser: (expenseFilterRaw: string | null, transferFilterRaw: string | null) => {
    expenseFilter: ExpenseFilter;
    transferFilter: TransferFilter;
};
