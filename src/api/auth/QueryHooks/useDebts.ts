import { Signal } from "@preact/signals-react";
import useGroupDebts from "./useGroupDebts";
import useNonGroupDebts from "./useNonGroupDebts";
import { ExpenseParsedFilters, TransferParsedFilters } from "../../../types";

export const useDebts = (groupId?: string, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>) => {
  const normal = useGroupDebts(groupId,expenseParsedFilters,transferParsedFilters);
  const nonGroup = useNonGroupDebts();

  return !!groupId ? normal : nonGroup;
};