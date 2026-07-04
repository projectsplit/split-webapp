import { useMemo } from 'react';
import { useDebts } from '@/api/auth/QueryHooks/useDebts';
import { getAllCurrencyTotals, getCurrencyValues, } from '@/helpers/getTotalsByCurrency';
import { Mode } from '@/types';
export const useExpenseTotals = (group, mode, userInfo, userMemberId, expenseParsedFilters) => {
    const { data: debts, isFetching: totalsAreFetching } = useDebts(mode, group?.id, expenseParsedFilters);
    const totals = useMemo(() => {
        const totalSpentByCurrency = debts?.totalSpent ?? {};
        const convertedTotalSpent = debts?.convertedTotalSpent ?? {};
        const groupTotalsByCurrency = getAllCurrencyTotals(totalSpentByCurrency);
        const userTotalsByCurrency = mode === Mode.Group
            ? getCurrencyValues(totalSpentByCurrency, userMemberId)
            : getCurrencyValues(totalSpentByCurrency, userInfo?.userId);
        const totalFromAllExpensesConverted = Object.values(convertedTotalSpent).reduce((sum, val) => sum + (val ?? 0), 0);
        const totalFromUserExpensesConverted = mode === Mode.Group
            ? userMemberId && group?.currency
                ? (convertedTotalSpent[userMemberId] ?? 0)
                : 0
            : (convertedTotalSpent[userInfo?.userId] ?? 0);
        return {
            groupTotalsByCurrency,
            userTotalsByCurrency,
            totalFromAllExpensesConverted,
            totalFromUserExpensesConverted,
        };
    }, [debts, mode, userMemberId, group, userInfo?.currency]);
    return { ...totals, totalsAreFetching };
};
