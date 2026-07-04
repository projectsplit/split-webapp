import { Mode } from '../../../types';
import useGetGroupTransfers from '../../../api/auth/QueryHooks/useGetGroupTransfers';
import useGetNonGroupTransfers from '../../../api/auth/QueryHooks/useGetNonGroupTransfers';
export const useTransferList = (mode, group, transferParsedFilters, pageSize, timeZoneId) => {
    const isNonGroup = mode === Mode.NonGroup;
    const groupQuery = useGetGroupTransfers(group, transferParsedFilters, pageSize, timeZoneId);
    const nonGroupQuery = useGetNonGroupTransfers(transferParsedFilters, pageSize, timeZoneId);
    if (isNonGroup)
        return nonGroupQuery;
    return groupQuery;
};
