import { CSSTransition } from "react-transition-group";
import ExpenseForm from "../../ExpenseForm/ExpenseForm";
import { NewExpenseAnimationProps } from "../../../interfaces";

export default function NewExpenseAnimation({
  group,
  timeZoneId,
  menu,
  timeZoneCoordinates
}: NewExpenseAnimationProps) {
  return (
    <CSSTransition in={menu.value === "newExpense"} timeout={0} unmountOnExit>
      <ExpenseForm
        group={group}
        expense={null}
        timeZoneId={timeZoneId}
        menu={menu}
        timeZoneCoordinates={timeZoneCoordinates}
      />
    </CSSTransition>
  );
}
