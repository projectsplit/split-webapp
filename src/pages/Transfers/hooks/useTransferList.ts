import { Signal } from "@preact/signals-react";
import { TransactionType, Group, TransferParsedFilters } from "../../../types";
import useGetGroupTransfers from "../../../api/auth/QueryHooks/useGetGroupTransfers";
import useGetNonGroupTransfers from "../../../api/auth/QueryHooks/useGetNonGroupTransfers";


export const useTransferList = (
  transactionType: TransactionType,
  group: Group,
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
) => {

  const isNonGroup = transactionType === "NonGroup";


  const groupQuery = useGetGroupTransfers(
    group,
    transferParsedFilters,
    pageSize,
    timeZoneId
  );

  const nonGroupQuery = useGetNonGroupTransfers(
    transferParsedFilters,
    pageSize,
    timeZoneId,
  );

  if (isNonGroup) return nonGroupQuery;
  return groupQuery;


}
