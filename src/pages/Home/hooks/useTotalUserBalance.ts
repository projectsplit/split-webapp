import { useGetGroupsAllBalances } from "@/api/auth/QueryHooks/useGetGroupsAllBalances";
import { computeNetPerCurrency } from "@/helpers/computeNetPerCurrency";
import { useFetchAndGroupNonGroupDebts } from "@/pages/Groups/hooks/useFetchAndGroupNonGroupDebts";
import { Details, GroupedTransaction, GroupsAllBalancesResponse } from "@/types";
import { useMemo } from "react";


interface UseTotalUserBalanceResult {
    totalBalances: Details;
    isLoading: boolean;
    isFetching: boolean;
    groupsData?: GroupsAllBalancesResponse;
    nonGroupGroupedTransactions: GroupedTransaction[];
}

export function useTotalUserBalance(userId: string): UseTotalUserBalanceResult {

    const {
        data: groupsData,
        isFetching: isFetchingGroups,
        isLoading: isLoadingGroups,
    } = useGetGroupsAllBalances();

    const {
        groupedTransactions,
        isFetchingDebts,
        isLoadingDebts,
    } = useFetchAndGroupNonGroupDebts(userId, "NonGroup");

    const totalBalances = useMemo<Details>(() => {
        if (!userId) return {};

        const nonGroupBalances = computeNetPerCurrency(groupedTransactions, userId);
        const groupBalances = groupsData?.balances ?? {};

        const result: Details = {};

        // Add non-group → group amounts
        for (const [currency, amount] of Object.entries(nonGroupBalances)) {
            result[currency] = (result[currency] ?? 0) + amount;
        }

        // Add group amounts (preserving already added non-group values)
        for (const [currency, amount] of Object.entries(groupBalances)) {
            result[currency] = (result[currency] ?? 0) + amount;
        }

        return result;
    }, [groupedTransactions, groupsData?.balances, userId]);

    const isLoading = isLoadingGroups || isLoadingDebts;
    const isFetching = isFetchingGroups || isFetchingDebts;
    const nonGroupGroupedTransactions = groupedTransactions;
    return {
        totalBalances,
        isLoading,
        isFetching,
        groupsData,
        nonGroupGroupedTransactions,
    };
}