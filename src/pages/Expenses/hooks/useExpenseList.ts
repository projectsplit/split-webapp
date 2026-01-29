import { Signal } from "@preact/signals-react";
import {
  ExpenseParsedFilters,
  Group,
  TransactionType,
} from "../../../types";
import useGetGroupExpenses from "../../../api/services/useGetGroupExpenses";
import { useGetNonGroupExpenses } from "../../../api/services/useGetNonGroupExpenses";
import { useGetPersonalExpenses } from "../../../api/services/useGetPersonalExpenses";

export const useExpenseList = (
  transactionType: TransactionType,
  group: Group,
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string
) => {
  const isGroup = transactionType === "Group";
  const isNonGroup = transactionType === "NonGroup";
  const isPersonal = transactionType === "Personal";

  const groupQuery = useGetGroupExpenses(
    group,
    expenseParsedFilters,
    pageSize,
    timeZoneId,
    isGroup
  );

  const nonGroupQuery = useGetNonGroupExpenses(
    expenseParsedFilters,
    pageSize,
    timeZoneId,
    isNonGroup
  );

  const personalQuery = useGetPersonalExpenses(
    expenseParsedFilters,
    pageSize,
    timeZoneId,
    isPersonal
  );

  if (isGroup) return groupQuery;
  if (isNonGroup) return nonGroupQuery;
  return personalQuery;
};
