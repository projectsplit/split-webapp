import { ExpenseFormProps } from "../../interfaces";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const CreateExpenseForm: React.FC<ExpenseFormProps> = ({
  groupId,
  expense,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  header,
  selectedExpense,
  isPersonal,
  isnonGroupExpense,
  allGroupMembers,
  currency,
  allNonGroupUsers,
  nonGroupMenu
}) => {
  return (
    <ExpenseForm
      allGroupMembers={allGroupMembers}
      expense={expense}
      groupId={groupId}
      menu={menu}
      timeZoneCoordinates={timeZoneCoordinates}
      timeZoneId={timeZoneId}
      header={header}
      isCreateExpense={true}
      selectedExpense={selectedExpense}
      isPersonal={isPersonal}
      isnonGroupExpense={isnonGroupExpense}
      currency={currency}
      allNonGroupUsers={allNonGroupUsers}
      nonGroupMenu={nonGroupMenu}
    />
  );
};

export default CreateExpenseForm;
