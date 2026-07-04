import { useMultipleGroupTransfers } from './useMultipleGroupTransfers';
import { useMultipleNonGroupTransfers } from './useMultipleNonGroupTransfers';
export const useMultipleTransfers = (menu, groupId) => {
    const groupTransfer = useMultipleGroupTransfers(menu);
    const nonGroupTransfer = useMultipleNonGroupTransfers(menu);
    return !!groupId ? groupTransfer : nonGroupTransfer;
};
