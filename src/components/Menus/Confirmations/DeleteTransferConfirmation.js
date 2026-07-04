import { jsx as _jsx } from "react/jsx-runtime";
import Confirmation from './Confirmation';
import { useDeleteTransferMutation } from '@/api/auth/CommandHooks/useDeleteTransferMutation';
export default function DeleteTransferConfirmation({ menu, selectedTransfer, errorMessage, }) {
    const { mutate: deleteTransfer, isPending } = useDeleteTransferMutation(menu, errorMessage, selectedTransfer);
    const transferId = selectedTransfer.value?.id;
    const handleDelete = () => {
        if (!transferId)
            return;
        deleteTransfer(transferId);
    };
    return (_jsx(Confirmation, { onClick: handleDelete, menu: menu, isLoading: isPending, header: 'Confirmation', children: _jsx("div", { children: "Are you sure you want to delete this transfer?" }) }));
}
