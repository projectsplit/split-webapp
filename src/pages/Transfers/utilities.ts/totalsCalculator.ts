import { DebtsResponse, Group, TransactionType, UserInfo } from "@/types";

export const totalsCalculator = (debts: DebtsResponse | undefined, transactionType: TransactionType, userMemberId: string | undefined, group: Group, userInfo: UserInfo) => {

  const groupTotalReceived: Record<
    string,
    Record<string, number>
  > = debts?.totalReceived ?? {};
  const groupTotalSent: Record<
    string,
    Record<string, number>
  > = debts?.totalSent ?? {};


  const shouldOpenMultiCurrencyTable =
    [...new Set(Object.values(groupTotalReceived).map(obj => Object.keys(obj)).flat())].length > 1 ||
    [...new Set(Object.values(groupTotalSent).map(obj => Object.keys(obj)).flat())].length > 1;

  let usertotalReceived: number;
  let usertotalSent: number;

  if (transactionType === "Group") {
    usertotalReceived = userMemberId && group.currency
      ? groupTotalReceived[userMemberId]?.[group.currency] ?? 0
      : 0;
  } else {
    usertotalReceived = userInfo.userId && userInfo.currency
      ? groupTotalReceived[userInfo.userId]?.[userInfo.currency] ?? 0
      : 0;
  }

  if (transactionType === "Group") {
    usertotalSent =
      userMemberId && group.currency
        ? groupTotalSent[userMemberId]?.[group.currency] ?? 0
        : 0;
  } else {
    usertotalSent =
      userInfo.userId && userInfo.currency
        ? groupTotalSent[userInfo.userId]?.[userInfo.currency] ?? 0
        : 0;
  }


  return { usertotalReceived, usertotalSent, shouldOpenMultiCurrencyTable }
}