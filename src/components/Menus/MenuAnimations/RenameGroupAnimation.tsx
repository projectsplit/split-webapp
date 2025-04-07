import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { RenameGroupAnimationAnimationProps } from "../../../interfaces";
import RenameGroupMenu from "../RenameGroupMenu/RenameGroupMenu";

export default function RenameGroupAnimationAnimation({
  menu,
  groupId,
  groupName
}: RenameGroupAnimationAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "renameGroup"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <RenameGroupMenu menu={menu} groupId={groupId}  groupName={ groupName} />
    </CSSTransition>
  );
}
