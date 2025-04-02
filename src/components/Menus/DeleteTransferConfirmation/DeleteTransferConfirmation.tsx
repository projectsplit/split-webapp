import { DeleteTransferConfirmationProps } from "../../../interfaces";
import IonIcon from "@reacticons/ionicons";
import MyButton from "../../MyButton/MyButton";
import Separator from "../../Separator/Separator";
import { StyledDeleteTransferConfirmation } from "./DeleteTransferConfirmation.styled";
import { useDeleteTransfer } from "../../../api/services/useDeleteTransfer";

export default function DeleteTransferConfirmation({
  menu,
  selectedTransfer,
  errorMessage,
}: DeleteTransferConfirmationProps) {
  const { mutate: deleteTransfer, isPending } = useDeleteTransfer(menu,errorMessage,selectedTransfer);

  const transferId = selectedTransfer.value?.id;

  const handleDelete = () => {
    if (!transferId) return;
    deleteTransfer(transferId);
  };

  return (
    <StyledDeleteTransferConfirmation>
      <div className="headerSeparator">
        <div className="header">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <span>Confirmation</span>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      <div className="info">
        <div>Are you sure you want to delete this transfer?</div>

        <div />
      </div>
      <div className="buttons">
        <MyButton onClick={handleDelete} isLoading={isPending}>
          Confirm
        </MyButton>
        <MyButton variant="secondary" onClick={() => (menu.value = null)}>
          Cancel
        </MyButton>
      </div>
    </StyledDeleteTransferConfirmation>
  );
}
