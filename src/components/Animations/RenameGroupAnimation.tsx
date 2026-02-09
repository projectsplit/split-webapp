import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { RenameGroupAnimationProps } from "../../interfaces";
import RenameGroupMenu from "../Menus/RenameGroupMenu/RenameGroupMenu";

export default function RenameGroupAnimation({
  menu,
  groupId,
  groupName
}: RenameGroupAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "renameGroup"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <RenameGroupMenu menu={menu} groupId={groupId} groupName={groupName} />
    </CSSTransition>
  );
}
