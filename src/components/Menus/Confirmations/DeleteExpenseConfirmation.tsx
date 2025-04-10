import { DeleteExpenseConfirmationProps } from "../../../interfaces";
import { useDeleteExpense } from "../../../api/services/useDeleteExpense";
import Confirmation from "./Confirmation";

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
    <Confirmation onClick={handleDelete} menu={menu} isLoading={isPending} header={"Confirmation"}>
      {description ? (
        <div>
          Are you sure you want to delete{" "}
          <span className="descr">"{description}"</span> ?{" "}
        </div>
      ) : (
        <div>Delete this expense?</div>
      )}
    </Confirmation>
  );
}
