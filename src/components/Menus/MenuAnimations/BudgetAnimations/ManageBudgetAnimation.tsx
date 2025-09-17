import { CSSTransition } from "react-transition-group";
import { ManageBudgetAnimationProps } from "../../../../interfaces";
import ManageBudgetMenu from "../../../../pages/Budget/ManageBudgetMenu/ManageBudgetMenu";
import { useRef } from "react";

export default function ManageBudgetAnimation({
  menu,
}: ManageBudgetAnimationProps) {
   const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "manageBudgetMenu"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ManageBudgetMenu menu={menu} />
    </CSSTransition>
  );
}
