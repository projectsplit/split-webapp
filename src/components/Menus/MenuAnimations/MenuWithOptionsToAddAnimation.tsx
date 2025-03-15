import { CSSTransition } from "react-transition-group";
import { GroupQuickActionsAnimationProps } from "../../../interfaces";
import GroupQuickActionsMenu from "../GroupQuickActionsMenu/GroupQuickActionsMenu";


export default function GroupQuickActionsAnimation({

menu
}: GroupQuickActionsAnimationProps) {
  return (
    <CSSTransition
    in={menu.value === "menuWithOptions"}
    timeout={100}
    classNames="bottomslide"
    unmountOnExit
  >
    <GroupQuickActionsMenu menu={menu} />
  </CSSTransition>
  );
}
