import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import { getCurrencyValues } from "@/helpers/getTotalsByCurrency";
import { Mode, TransferParsedFilters, Group, UserInfo } from "@/types";
import { totalsCalculator } from "../utilities.ts/totalsCalculator";

export const useTransferTotals = (
  group: Group | null,
  mode: Mode,
  userInfo: UserInfo,
  userMemberId: string | undefined,
  transferParsedFilters: Signal<TransferParsedFilters>
) => {
  const { data: debts, isFetching: totalsAreFetching } = useDebts(mode, group?.id, undefined, transferParsedFilters);

  const totals = useMemo(() => {
    const groupTotalReceived = debts?.totalReceived ?? {};
    const groupTotalSent = debts?.totalSent ?? {};

    const userTotalSentByCurr = mode === Mode.Group
      ? getCurrencyValues(groupTotalSent, userMemberId)
      : getCurrencyValues(groupTotalSent, userInfo?.userId);

    const userTotalReceivedByCurr = mode === Mode.Group
      ? getCurrencyValues(groupTotalReceived, userMemberId)
      : getCurrencyValues(groupTotalReceived, userInfo?.userId);

    const { usertotalReceived, usertotalSent, shouldOpenMultiCurrencyTable } = totalsCalculator(
      debts,
      mode,
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
  }, [debts, mode, userMemberId, userInfo, group]);

  return { ...totals, totalsAreFetching };
};
