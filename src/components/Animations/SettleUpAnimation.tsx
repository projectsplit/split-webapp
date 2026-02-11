import { CSSTransition } from "react-transition-group";
import { SettleUpAnimationProps } from "../../interfaces";
import SettleUpOptions from "../../pages/Members/SettleUpOptions/SettleUpOptions";
import { useRef } from "react";

export default function SettleUpAnimation({
  menu,
  pendingTransactions,
  idSelectedToSettleUp,
  members,
  userId
}: SettleUpAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "SettleUp"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SettleUpOptions
        pendingTransactions={pendingTransactions}
        idSelectedToSettleUp={idSelectedToSettleUp}
        menu={menu}
        members={members}
        userId={userId}
      />
    </CSSTransition>
  );
}
