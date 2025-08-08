import { CSSTransition } from "react-transition-group";
import {ManageBudgetAnimationProps } from "../../../../interfaces";
import ManageBudgetMenu from "../../../../pages/Budget/ManageBudgetMenu/ManageBudgetMenu";

export default function ManageBudgetAnimation({
  menu,
}: ManageBudgetAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "manageBudgetMenu"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ManageBudgetMenu menu={menu} />
    </CSSTransition>
  );
}
