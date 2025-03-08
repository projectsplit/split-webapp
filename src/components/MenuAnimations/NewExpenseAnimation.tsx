import React from "react";
import { CSSTransition } from "react-transition-group";
import ExpenseForm from "../../pages/ExpenseForm";
import { NewExpenseAnimationProps } from "../../interfaces";


export default function NewExpenseAnimation({
group,
timeZoneId,
menu
}: NewExpenseAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "newExpense"}
      timeout={0}
      unmountOnExit
    >
     <ExpenseForm group={group} expense={null} timeZoneId={timeZoneId} menu={menu}/>
    </CSSTransition>
  );
}

