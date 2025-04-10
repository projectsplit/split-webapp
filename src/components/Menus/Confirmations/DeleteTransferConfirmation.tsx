import { DeleteTransferConfirmationProps } from "../../../interfaces";
import { useDeleteTransfer } from "../../../api/services/useDeleteTransfer";
import Confirmation from "./Confirmation";

export default function DeleteTransferConfirmation({
  menu,
  selectedTransfer,
  errorMessage,
}: DeleteTransferConfirmationProps) {
  const { mutate: deleteTransfer, isPending } = useDeleteTransfer(
    menu,
    errorMessage,
    selectedTransfer
  );

  const transferId = selectedTransfer.value?.id;

  const handleDelete = () => {
    if (!transferId) return;
    deleteTransfer(transferId);
  };

  return (
    <Confirmation onClick={handleDelete} menu={menu} isLoading={isPending} header={"Confirmation"}>
      <div>Are you sure you want to delete this transfer?</div>
    </Confirmation>
  );
}
