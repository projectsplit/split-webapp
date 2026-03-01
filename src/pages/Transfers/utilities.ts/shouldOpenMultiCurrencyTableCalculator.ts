import { DebtsResponse} from "@/types";

export const shouldOpenMultiCurrencyTableCalculator = (debts: DebtsResponse | undefined) => {

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



  return shouldOpenMultiCurrencyTable 
}