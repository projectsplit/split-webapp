import { EditExpenseFormProps } from "../../interfaces";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const EditExpenseForm: React.FC<EditExpenseFormProps> = ({
  groupId,
  expense,
  timeZoneId,
  menu,
  selectedExpense,
  timeZoneCoordinates,
  isPersonal,
  groupMembers,
  currency,
  isnonGroupExpense,
  nonGroupUsers,
  isCreateExpense
}) => {
  if (!expense) {
    return <div>Error: Expense not found.</div>;
  }

  return (
    <ExpenseForm
      expense={expense}
      groupId={groupId}
      menu={menu}
      timeZoneCoordinates={timeZoneCoordinates}
      timeZoneId={timeZoneId}
      header="Edit Expense"
      selectedExpense={selectedExpense}
      isCreateExpense={isCreateExpense}
      isPersonal={isPersonal}
      currency={currency}
      groupMembers={groupMembers}
      isnonGroupExpense={isnonGroupExpense}
      nonGroupUsers={nonGroupUsers}
    />
  );
};
export default EditExpenseForm;
