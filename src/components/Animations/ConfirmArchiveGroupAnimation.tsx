import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { ConfirmArchiveGroupAnimationProps } from "../../interfaces";
import ConfirmArchiveGroup from "../Menus/Confirmations/ConfirmArchiveGroup";

export default function ConfirmArchiveGroupAnimation({
  menu,
  groupId,
  openGroupOptionsMenu
}: ConfirmArchiveGroupAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "archiveGroup"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ConfirmArchiveGroup menu={menu} groupId={groupId} openGroupOptionsMenu={openGroupOptionsMenu} navigateToGroups={true} />
    </CSSTransition>
  );
}
