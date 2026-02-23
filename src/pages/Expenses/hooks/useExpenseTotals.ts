import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import { getAllCurrencyTotals, getCurrencyValues, getTotalByCurrency } from "@/helpers/getTotalsByCurrency";
import { ExpenseParsedFilters, Group, Mode, UserInfo } from "@/types";

export const useExpenseTotals = (
  group: Group | null,
  mode: Mode,
  userInfo: UserInfo,
  userMemberId: string | undefined,
  expenseParsedFilters: Signal<ExpenseParsedFilters>
) => {
  //TODO: add condition to exlcude if transaction type is Personal as different endpoint will be used.
  //I think that due to enabled these will never run anyway
  const { data: debts, isFetching: totalsAreFetching } = useDebts(mode, group?.id, expenseParsedFilters);

  const totals = useMemo(() => {
    const totalSpent: Record<string, Record<string, number>> = debts?.totalSpent ?? {};

    const groupTotalsByCurrency = getAllCurrencyTotals(totalSpent);
    const userTotalsByCurrency = mode === Mode.Group
      ? getCurrencyValues(totalSpent, userMemberId)
      : getCurrencyValues(totalSpent, userInfo?.userId);

    const totalExpense = getTotalByCurrency(
      totalSpent,
      group?.currency || userInfo?.currency
    );

    const userExpense =
      mode === Mode.Group
        ? userMemberId && group?.currency
          ? totalSpent[userMemberId]?.[group?.currency] ?? 0
          : 0
        : totalSpent[userInfo?.userId]?.[userInfo?.currency] ?? 0;

    const shouldOpenMultiCurrencyTable = Object.keys(groupTotalsByCurrency).length > 1 || Object.keys(userTotalsByCurrency).length > 1;

    return {
      groupTotalsByCurrency,
      userTotalsByCurrency,
      totalExpense,
      userExpense,
      shouldOpenMultiCurrencyTable,
    };
  }, [debts, mode, userMemberId, userInfo, group]);

  return { ...totals, totalsAreFetching };
};
