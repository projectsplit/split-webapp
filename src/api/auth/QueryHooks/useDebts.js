import useGroupDebts from './useGroupDebts';
import useNonGroupDebts from './useNonGroupDebts';
import { Mode, } from '../../../types';
import useUserTotals from './useUserTotals';
export const useDebts = (mode, groupId, expenseParsedFilters, transferParsedFilters) => {
    const normal = useGroupDebts(groupId, expenseParsedFilters, transferParsedFilters);
    const nonGroup = useNonGroupDebts(mode, expenseParsedFilters, transferParsedFilters);
    const personal = useUserTotals(mode, expenseParsedFilters);
    return mode === Mode.Group
        ? normal
        : mode === Mode.NonGroup
            ? nonGroup
            : personal;
};
