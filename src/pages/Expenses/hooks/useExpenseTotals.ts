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
    const totalSpent: Record<string, Record<string, number>> = debts?.totalSpent ?? {};
    const convertedTotalSpent: Record<string, number> = debts?.convertedTotalSpent ?? {};

    const groupTotalsByCurrency = getAllCurrencyTotals(totalSpent);
    const userTotalsByCurrency = mode === Mode.Group
      ? getCurrencyValues(totalSpent, userMemberId)
      : getCurrencyValues(totalSpent, userInfo?.userId);


    const amounts = debts?.convertedTotalSpent ?? {};
    const totalExpenseConverted = Object.values(amounts).reduce((sum, val) => sum + (val ?? 0), 0);


    const userExpenseConverted =
      mode === Mode.Group
        ? userMemberId && group?.currency
          ? convertedTotalSpent[userMemberId] ?? 0
          : 0
        : convertedTotalSpent[userInfo?.userId] ?? 0;



    const shouldOpenMultiCurrencyTable = Object.keys(groupTotalsByCurrency).length > 1 || Object.keys(userTotalsByCurrency).length > 1;

    return {
      groupTotalsByCurrency,
      userTotalsByCurrency,
      totalExpenseConverted,
      userExpenseConverted,
      shouldOpenMultiCurrencyTable,
    };
  }, [debts, mode, userMemberId, userInfo, group]);

  return { ...totals, totalsAreFetching };
};
