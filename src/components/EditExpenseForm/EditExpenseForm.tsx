
import { EditExpenseFormProps } from "../../interfaces";
import ExpenseForm2 from "../ExpenseForm/ExpenseForm2";

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
    <ExpenseForm2
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