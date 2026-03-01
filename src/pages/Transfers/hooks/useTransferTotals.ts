import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import { getCurrencyValues } from "@/helpers/getTotalsByCurrency";
import { Mode, TransferParsedFilters, Group, UserInfo } from "@/types";
import {  shouldOpenMultiCurrencyTableCalculator } from "../utilities.ts/shouldOpenMultiCurrencyTableCalculator";

export const useTransferTotals = (
  group: Group | null,
  mode: Mode,
  userInfo: UserInfo,
  transferParsedFilters: Signal<TransferParsedFilters>
) => {

  const members = group?.members ?? [];
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id ?? "";

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

    const userConvertedTotalReceived = mode === Mode.Group
      ? debts?.convertedTotalReceived[userMemberId]
      : debts?.convertedTotalReceived[userInfo?.userId];

    const userConvertedTotalSent = mode === Mode.Group
      ? debts?.convertedTotalSent[userMemberId]
      : debts?.convertedTotalSent[userInfo?.userId];

    const shouldOpenMultiCurrencyTable = shouldOpenMultiCurrencyTableCalculator(debts);

    return {
      userTotalSentByCurr,
      userTotalReceivedByCurr,
      userConvertedTotalReceived,
      userConvertedTotalSent,
      shouldOpenMultiCurrencyTable,
    };
  }, [debts, mode, userMemberId, userInfo, group]);

  return { ...totals, totalsAreFetching };
};
