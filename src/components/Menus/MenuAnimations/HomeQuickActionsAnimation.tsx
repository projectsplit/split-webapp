import { CSSTransition } from "react-transition-group";
import { HomeQuickActionsAnimationProps } from "../../../interfaces";
import { useRef } from "react";
import HomeQuickActionsMenu from "../HomeQuickActionsMenu/HomeQuickActionsMenu";

export default function HomeQuickActionsAnimation({
  menu,
  isPersonal
}: HomeQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "quickActions"}
      timeout={100}
      classNames="quick-actions"
      unmountOnExit
    >
      <HomeQuickActionsMenu menu={menu} isPersonal={isPersonal}/>
    </CSSTransition>
  );
}
