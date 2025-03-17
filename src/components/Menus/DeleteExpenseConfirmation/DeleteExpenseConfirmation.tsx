import { DeleteExpenseConfirmationProps } from "../../../interfaces";
import { StyledDeleteExpenseConfirmation } from "./DeleteExpenseConfirmation.styled";
import IonIcon from "@reacticons/ionicons";
import MyButton from "../../MyButton/MyButton";
import { useDeleteExpense } from "../../../api/services/useDeleteExpense";
import { AxiosError } from "axios";
import Separator from "../../Separator/Separator";

export default function DeleteExpenseConfirmation({
  menu,
  description,
  selectedExpense,
  errorMessage,
}: DeleteExpenseConfirmationProps) {
  const deleteExpense = useDeleteExpense();

  const expenseId = selectedExpense.value?.id;

  const handleDelete = async () => {
    if (!expenseId) return;
    try {
      await deleteExpense.mutateAsync(expenseId);
    } catch (err) {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
      selectedExpense.value = null;
      menu.value = null;
    } finally {
      selectedExpense.value = null;
      menu.value = null;
    }
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
        <MyButton onClick={handleDelete}>Confirm</MyButton>
        <MyButton variant="secondary" onClick={() => (menu.value = null)}>
          Cancel
        </MyButton>
      </div>
    </StyledDeleteExpenseConfirmation>
  );
}

{
  /* <div className="header">
<IonIcon name="information-circle-outline" className="infoLogo" />
<span>Confirmation</span>
<div className="closeButton" onClick={() => (menu.value = null)}>
  <IonIcon name="close-outline" className="close" />
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
</div> */
}
