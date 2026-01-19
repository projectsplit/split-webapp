import { CSSTransition } from "react-transition-group";
import { NewExpenseAnimationProps } from "../../../interfaces";
import EditExpenseForm from "../../EditExpenseForm/EditExpenseForm";
import { useRef } from "react";


export default function EditExpenseAnimation({
  groupId,
  timeZoneId,
  menu,
  expense,
  selectedExpense,
  timeZoneCoordinates,
  isPersonal,
  groupMembers,
  currency,
  isnonGroupExpense,
  nonGroupUsers
}: NewExpenseAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition in={menu.value === "editExpense"} timeout={0} unmountOnExit nodeRef={nodeRef}>
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
        groupMembers={groupMembers}
        currency={currency}
        isnonGroupExpense={isnonGroupExpense}
        nonGroupUsers={nonGroupUsers}

      />
    </CSSTransition>
  );
}
