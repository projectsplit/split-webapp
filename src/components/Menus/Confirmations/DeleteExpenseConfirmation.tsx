import { DeleteExpenseConfirmationProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useDeleteExpenseMutation } from "@/api/services/useDeleteExpenseMutation";

export default function DeleteExpenseConfirmation({
  menu,
  description,
  selectedExpense,
  errorMessage,
}: DeleteExpenseConfirmationProps) {
  
  const { mutate: deleteExpense, isPending } = useDeleteExpenseMutation(
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
