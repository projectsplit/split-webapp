import { CSSTransition } from "react-transition-group";
import { GroupQuickActionsAnimationProps } from "../../../interfaces";
import GroupQuickActionsMenu from "../GroupQuickActionsMenu/GroupQuickActionsMenu";
import { useRef } from "react";

export default function GroupQuickActionsAnimation({
  menu,
}: GroupQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "menuWithOptions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <GroupQuickActionsMenu menu={menu} />
    </CSSTransition>
  );
}
