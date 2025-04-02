import { DeleteExpenseConfirmationProps } from "../../../interfaces";
import { StyledDeleteExpenseConfirmation } from "./DeleteExpenseConfirmation.styled";
import IonIcon from "@reacticons/ionicons";
import MyButton from "../../MyButton/MyButton";
import { useDeleteExpense } from "../../../api/services/useDeleteExpense";
import Separator from "../../Separator/Separator";

export default function DeleteExpenseConfirmation({
  menu,
  description,
  selectedExpense,
  errorMessage,
}: DeleteExpenseConfirmationProps) {
  const { mutate: deleteExpense, isPending } = useDeleteExpense(
    menu,
    errorMessage,
    selectedExpense
  );

  const expenseId = selectedExpense.value?.id;

  const handleDelete = () => {
    if (!expenseId) return;
    deleteExpense(expenseId);
  };

  return (
    <StyledDeleteExpenseConfirmation>
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
        {description ? (
          <div>
            Are you sure you want to delete{" "}
            <span className="descr">"{description}"</span> ?{" "}
          </div>
        ) : (
          <div>Delete this expense?</div>
        )}
        <div />
      </div>
      <div className="buttons">
        <MyButton isLoading={isPending} onClick={handleDelete}>
          Confirm
        </MyButton>
        <MyButton variant="secondary" onClick={() => (menu.value = null)}>
          Cancel
        </MyButton>
      </div>
    </StyledDeleteExpenseConfirmation>
  );
}
