import { CSSTransition } from "react-transition-group";
import { NewExpenseAnimationProps } from "../../../interfaces";
import EditExpenseForm from "../../EditExpenseForm/EditExpenseForm";

export default function EditExpenseAnimation({
  group,
  timeZoneId,
  menu,
  expense
}: NewExpenseAnimationProps) {
  return (
    <CSSTransition in={menu.value === "editExpense"} timeout={0} unmountOnExit>
      <EditExpenseForm
        group={group}
        expense={expense}
        timeZoneId={timeZoneId}
        menu={menu}
      />
    </CSSTransition>
  );
}
