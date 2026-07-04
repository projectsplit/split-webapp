import { useGetGroupsAllBalances } from '@/api/auth/QueryHooks/useGetGroupsAllBalances';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import { useFetchAndGroupNonGroupDebts } from '@/pages/Groups/hooks/useFetchAndGroupNonGroupDebts';
import { Mode, } from '@/types';
import { useMemo } from 'react';
export function useTotalUserBalance(userId) {
    const { data: groupsData, isFetching: isFetchingGroups, isLoading: isLoadingGroups, } = useGetGroupsAllBalances();
    const { groupedTransactions, isFetchingDebts, isLoadingDebts } = useFetchAndGroupNonGroupDebts(userId, Mode.NonGroup);
    const totalBalances = useMemo(() => {
        if (!userId)
            return {};
        const nonGroupBalances = computeNetPerCurrency(groupedTransactions, userId);
        const groupBalances = groupsData?.balances ?? {};
        const result = {};
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
