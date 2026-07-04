import { Details, GroupedTransaction, GroupsAllBalancesResponse } from '@/types';
interface UseTotalUserBalanceResult {
    totalBalances: Details;
    isLoading: boolean;
    isFetching: boolean;
    groupsData?: GroupsAllBalancesResponse;
    nonGroupGroupedTransactions: GroupedTransaction[];
}
export declare function useTotalUserBalance(userId: string): UseTotalUserBalanceResult;
export {};
