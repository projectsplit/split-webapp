import { Mode } from '@/types';
export declare function useFetchAndGroupNonGroupDebts(userId: string, mode: Mode): {
    debts: import("@/types").Debt[];
    totalSpent: Record<string, Record<string, number>>;
    groupedTransactions: import("@/types").GroupedTransaction[];
    isFetchingDebts: boolean;
    isLoadingDebts: boolean;
};
