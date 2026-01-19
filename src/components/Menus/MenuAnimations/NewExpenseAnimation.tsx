import { CSSTransition } from "react-transition-group";
import CreateExpenseForm from "../../CreateExpenseForm/CreateExpenseForm";
import { NewExpenseAnimationProps } from "../../../interfaces";
// import { ExpenseResponseItem } from "../../../types";
// import { useSignal } from "@preact/signals-react";
import { useRef } from "react";

export default function NewExpenseAnimation({
  groupId,
  timeZoneId,
  menu,
  timeZoneCoordinates,
  isPersonal,
  selectedExpense,
  groupMembers,
  currency,
  nonGroupUsers,
  isnonGroupExpense,
  nonGroupMenu
}: NewExpenseAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "newExpense"}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <CreateExpenseForm
        groupId={groupId}
        expense={null}
        timeZoneId={timeZoneId}
        menu={menu}
        timeZoneCoordinates={timeZoneCoordinates}
        header="Create New Expense"
        isCreateExpense={true}
        selectedExpense={selectedExpense}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        currency={currency}
        nonGroupUsers={nonGroupUsers}
        isnonGroupExpense={isnonGroupExpense}
        nonGroupMenu={nonGroupMenu}
      />
    </CSSTransition>
  );
}
