import { CSSTransition } from "react-transition-group";
import CreateExpenseForm from "../../CreateExpenseForm/CreateExpenseForm";
import { NewExpenseAnimationProps } from "../../../interfaces";
import { ExpenseResponseItem } from "../../../types";
import { useSignal } from "@preact/signals-react";
import { useRef } from "react";

export default function NewExpenseAnimation({
  group,
  timeZoneId,
  menu,
  timeZoneCoordinates
}: NewExpenseAnimationProps) {
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
    const nodeRef = useRef(null);
  return (
    <CSSTransition in={menu.value === "newExpense"} timeout={0} unmountOnExit nodeRef={nodeRef}>
      <CreateExpenseForm
        group={group}
        expense={null}
        timeZoneId={timeZoneId}
        menu={menu}
        timeZoneCoordinates={timeZoneCoordinates}
        header="Create New Expense"
        isCreateExpense={true}
        selectedExpense={selectedExpense}
      />
    </CSSTransition>
  );
}
