import { CSSTransition } from "react-transition-group";
import { NewExpenseAnimationProps } from "../../../interfaces";
import EditExpenseForm from "../../EditExpenseForm/EditExpenseForm";

export default function EditExpenseAnimation({
  groupId,
  timeZoneId,
  menu,
  expense,
  selectedExpense,
  timeZoneCoordinates,
  isPersonal,
  allGroupMembers,
  currency,
  isnonGroupExpense,
  allNonGroupUsers
}: NewExpenseAnimationProps) {
  return (
    <CSSTransition in={menu.value === "editExpense"} timeout={0} unmountOnExit>
      <EditExpenseForm
        groupId={groupId}
        expense={expense}
        timeZoneId={timeZoneId}
        menu={menu}
        selectedExpense={selectedExpense}
        timeZoneCoordinates={timeZoneCoordinates}
        header="Edit Expense"
        isCreateExpense={false}
        isPersonal={isPersonal}
        allGroupMembers={allGroupMembers}
        currency={currency}
        isnonGroupExpense={isnonGroupExpense}
        allNonGroupUsers={allNonGroupUsers}
      
      />
    </CSSTransition>
  );
}
