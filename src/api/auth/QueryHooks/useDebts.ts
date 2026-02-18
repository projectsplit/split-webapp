import { Signal } from "@preact/signals-react";
import useGroupDebts from "./useGroupDebts";
import useNonGroupDebts from "./useNonGroupDebts";
import { ExpenseParsedFilters, TransactionType, TransferParsedFilters } from "../../../types";

export const useDebts = (transactionType: TransactionType,groupId?: string, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>,) => {
  const normal = useGroupDebts(groupId, expenseParsedFilters, transferParsedFilters);
  const nonGroup = useNonGroupDebts(transactionType,expenseParsedFilters, transferParsedFilters);

  return !!groupId ? normal : nonGroup;
};