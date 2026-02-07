import { DeleteTransferConfirmationProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useDeleteTransferMutation } from "@/api/services/useDeleteTransferMutation";

export default function DeleteTransferConfirmation({
  menu,
  selectedTransfer,
  errorMessage,
}: DeleteTransferConfirmationProps) {

  const { mutate: deleteTransfer, isPending } = useDeleteTransferMutation(
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
