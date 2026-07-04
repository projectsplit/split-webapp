import { Mode } from '../../../types';
import useGetGroupExpenses from '../../../api/auth/QueryHooks/useGetGroupExpenses';
import { useGetNonGroupExpenses } from '../../../api/auth/QueryHooks/useGetNonGroupExpenses';
import { useGetPersonalExpenses } from '../../../api/auth/QueryHooks/useGetPersonalExpenses';
export const useExpenseList = (mode, group, expenseParsedFilters, pageSize, timeZoneId, jumpToken) => {
    const isGroup = mode === Mode.Group;
    const isNonGroup = mode === Mode.NonGroup;
    const isPersonal = mode === Mode.Personal;
    const groupQuery = useGetGroupExpenses(group, expenseParsedFilters, pageSize, timeZoneId, isGroup, jumpToken);
    const nonGroupQuery = useGetNonGroupExpenses(expenseParsedFilters, pageSize, timeZoneId, isNonGroup, jumpToken);
    const personalQuery = useGetPersonalExpenses(expenseParsedFilters, pageSize, timeZoneId, isPersonal);
    if (isGroup)
        return groupQuery;
    if (isNonGroup)
        return nonGroupQuery;
    return personalQuery;
};
