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
  allGroupMembers,
  currency,
  isnonGroupExpense,
  allNonGroupUsers,
  
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
      isCreateExpense={false}
      isPersonal={isPersonal}
      currency={currency}
      allGroupMembers={allGroupMembers}
      isnonGroupExpense={isnonGroupExpense}
      allNonGroupUsers={allNonGroupUsers}
    />
  );
};
export default EditExpenseForm;
