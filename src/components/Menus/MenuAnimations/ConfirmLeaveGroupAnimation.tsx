import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { ConfirmLeaveGroupAnimationProps } from "../../../interfaces";
import ConfirmLeaveGroup from "../Confirmations/ConfirmLeaveGroup";

export default function ConfirmLeaveGroupAnimation({
  menu,
  groupId,
  memberId
}: ConfirmLeaveGroupAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "leaveGroup"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ConfirmLeaveGroup menu={menu} groupId={groupId} memberId={memberId}/>
    </CSSTransition>
  );
}
