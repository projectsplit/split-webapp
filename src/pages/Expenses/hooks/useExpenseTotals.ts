import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import { getAllCurrencyTotals, getCurrencyValues } from "@/helpers/getTotalsByCurrency";
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
    const totalSpentByCurrency: Record<string, Record<string, number>> = debts?.totalSpent ?? {};
    const convertedTotalSpent: Record<string, number> = debts?.convertedTotalSpent ?? {};

    const groupTotalsByCurrency = getAllCurrencyTotals(totalSpentByCurrency);
    const userTotalsByCurrency = mode === Mode.Group
      ? getCurrencyValues(totalSpentByCurrency, userMemberId)
      : getCurrencyValues(totalSpentByCurrency, userInfo?.userId);

    const totalFromAllExpensesConverted = Object.values(convertedTotalSpent).reduce((sum, val) => sum + (val ?? 0), 0);

    const totalFromUserExpensesConverted =
      mode === Mode.Group
        ? userMemberId && group?.currency
          ? convertedTotalSpent[userMemberId] ?? 0
          : 0
        : convertedTotalSpent[userInfo?.userId] ?? 0;

    return {
      groupTotalsByCurrency,
      userTotalsByCurrency,
      totalFromAllExpensesConverted,
      totalFromUserExpensesConverted,
    };

  }, [debts, mode, userMemberId,group, userInfo?.currency]);

  return { ...totals, totalsAreFetching };
};
