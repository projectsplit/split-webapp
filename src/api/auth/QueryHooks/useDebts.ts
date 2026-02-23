import { Signal } from "@preact/signals-react";
import useGroupDebts from "./useGroupDebts";
import useNonGroupDebts from "./useNonGroupDebts";
import { ExpenseParsedFilters, Mode, TransferParsedFilters } from "../../../types";

export const useDebts = (mode: Mode, groupId?: string, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>,) => {
  const normal = useGroupDebts(groupId, expenseParsedFilters, transferParsedFilters);
  const nonGroup = useNonGroupDebts(mode, expenseParsedFilters, transferParsedFilters);

  return mode === Mode.Group ? normal : nonGroup;
};