import { TransferParsedFilters } from '../types';

export const hasActiveTransferFilters = (
  filters: TransferParsedFilters
): boolean => {
  return (
    (filters.sendersIds?.length ?? 0) > 0 ||
    (filters.receiversIds?.length ?? 0) > 0 ||
    !!filters.freeText ||
    !!filters.before ||
    !!filters.after
  );
};
