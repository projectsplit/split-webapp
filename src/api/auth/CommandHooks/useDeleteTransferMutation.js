import { useDeleteTransfer } from './useDeleteTransfer';
import { useDeleteNonGroupTransfer } from './useDeleteNonGroupTransfer';
export function useDeleteTransferMutation(menu, errorMessage, selectedTransfer) {
    const hasGroup = !!selectedTransfer.value?.groupId;
    const normal = useDeleteTransfer(menu, errorMessage, selectedTransfer);
    const nonGroup = useDeleteNonGroupTransfer(menu, errorMessage, selectedTransfer);
    return hasGroup ? normal : nonGroup;
}
