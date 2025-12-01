import { CSSTransition } from "react-transition-group";
import { NewTransferAnimationProps } from "../../../interfaces";
import TransferForm from "../../TransferForm/TransferForm";
import { useRef } from "react";

export default function NewTransferAnimation({
  timeZoneId,
  menu,
  groupMembers,
  nonGroupUsers,
  currency,
  isnonGroupTransfer,
  groupId,
}: NewTransferAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "newTransfer"}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <TransferForm
        groupId={groupId}
        timeZoneId={timeZoneId}
        menu={menu}
        groupMembers={groupMembers}
        nonGroupUsers={nonGroupUsers}
        currency={currency}
        isnonGroupTransfer={isnonGroupTransfer}
      />
    </CSSTransition>
  );
}
