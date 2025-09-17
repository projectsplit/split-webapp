import { CSSTransition } from "react-transition-group";
import { NewTransferAnimationProps } from "../../../interfaces";
import TransferForm from "../../TransferForm/TransferForm";
import { useRef } from "react";

export default function NewTransferAnimation({
  group,
  timeZoneId,
  menu,
}: NewTransferAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "newTransfer"}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <TransferForm group={group} timeZoneId={timeZoneId} menu={menu} />
    </CSSTransition>
  );
}
