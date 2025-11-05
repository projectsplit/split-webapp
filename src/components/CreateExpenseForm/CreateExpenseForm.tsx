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
  groupMembers,
  currency,
  nonGroupUsers,
  nonGroupMenu,
  nonGroupGroups
}) => {
  return (
    <ExpenseForm
      groupMembers={groupMembers}
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
      nonGroupUsers={nonGroupUsers}
      nonGroupMenu={nonGroupMenu}
      nonGroupGroups={nonGroupGroups}
    />
  );
};

export default CreateExpenseForm;
