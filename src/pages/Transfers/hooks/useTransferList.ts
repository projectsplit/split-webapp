import { Signal } from '@preact/signals-react';
import { Mode, Group, TransferParsedFilters } from '../../../types';
import useGetGroupTransfers from '../../../api/auth/QueryHooks/useGetGroupTransfers';
import useGetNonGroupTransfers from '../../../api/auth/QueryHooks/useGetNonGroupTransfers';

export const useTransferList = (
  mode: Mode,
  group: Group,
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string
) => {
  const isNonGroup = mode === Mode.NonGroup;

  const groupQuery = useGetGroupTransfers(
    group,
    transferParsedFilters,
    pageSize,
    timeZoneId
  );

  const nonGroupQuery = useGetNonGroupTransfers(
    transferParsedFilters,
    pageSize,
    timeZoneId
  );

  if (isNonGroup) return nonGroupQuery;
  return groupQuery;
};
