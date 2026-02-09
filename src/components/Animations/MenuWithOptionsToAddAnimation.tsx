import { CSSTransition } from "react-transition-group";
import { GroupQuickActionsAnimationProps } from "../../interfaces";
import { useRef } from "react";
import ActionsMenu from "../Menus/ActionsMenu/ActionsMenu";

export default function GroupQuickActionsAnimation({
  menu,
}: GroupQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "quickActions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ActionsMenu
        onClickTransfer={() => (menu.value = "newTransfer")}
        onClickExpense={() => (menu.value = "newExpense")}
        bottom={30}
      />
    </CSSTransition>
  );
}
