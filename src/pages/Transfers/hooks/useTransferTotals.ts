import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import { getCurrencyValues } from "@/helpers/getTotalsByCurrency";
import { TransferParsedFilters, Group, TransactionType, UserInfo } from "@/types";
import { totalsCalculator } from "../utilities.ts/totalsCalculator";

export const useTransferTotals = (
  group: Group | null,
  transactionType: TransactionType,
  userInfo: UserInfo,
  userMemberId: string | undefined,
  transferParsedFilters: Signal<TransferParsedFilters>
) => {
  const { data: debts, isFetching: totalsAreFetching } = useDebts(group?.id, transferParsedFilters);

  const totals = useMemo(() => {
    const groupTotalReceived = debts?.totalReceived ?? {};
    const groupTotalSent = debts?.totalSent ?? {};

    const userTotalSentByCurr = transactionType === "Group"
      ? getCurrencyValues(groupTotalSent, userMemberId)
      : getCurrencyValues(groupTotalSent, userInfo?.userId);

    const userTotalReceivedByCurr = transactionType === "Group"
      ? getCurrencyValues(groupTotalReceived, userMemberId)
      : getCurrencyValues(groupTotalReceived, userInfo?.userId);

    const { usertotalReceived, usertotalSent, shouldOpenMultiCurrencyTable } = totalsCalculator(
      debts,
      transactionType,
      userMemberId,
      group!,
      userInfo
    );

    return {
      userTotalSentByCurr,
      userTotalReceivedByCurr,
      usertotalReceived,
      usertotalSent,
      shouldOpenMultiCurrencyTable,
    };
  }, [debts, transactionType, userMemberId, userInfo, group]);

  return { ...totals, totalsAreFetching };
};
