
import { EditExpenseFormProps } from "../../interfaces";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({
  group,
  expense,
  timeZoneId,
  menu,
  selectedExpense,
  timeZoneCoordinates
}) => {

  if (!expense) {
    return <div>Error: Expense not found.</div>;
  }
  
  return (
    <ExpenseForm
      expense={expense}
      group={group}
      menu={menu}
      timeZoneCoordinates={timeZoneCoordinates}
      timeZoneId={timeZoneId}
      header="Edit Expense"
      selectedExpense={selectedExpense}
      isCreateExpense={false}
    />
  );
};
export default EditExpenseForm;