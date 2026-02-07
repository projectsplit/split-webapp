import { Signal } from "@preact/signals-react";
import { TransferResponseItem } from "../../types";
import { useDeleteTransfer } from "./useDeleteTransfer";
import { useDeleteNonGroupTransfer } from "./useDeleteNonGroupTransfer";

export function useDeleteTransferMutation(
    menu: Signal<string | null>,
    errorMessage: Signal<string>,
    selectedTransfer: Signal<TransferResponseItem | null>,
) {
    const hasGroup = !!selectedTransfer.value?.groupId;

    const normal = useDeleteTransfer(menu, errorMessage, selectedTransfer);
    const nonGroup = useDeleteNonGroupTransfer(menu, errorMessage, selectedTransfer);
    
    return hasGroup ? normal : nonGroup;
}