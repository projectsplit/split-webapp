import { CSSTransition } from "react-transition-group";
import { SettleUpAnimationProps } from "../../interfaces";
import SettleUpOptions from "../../pages/Members/SettleUpOptions/SettleUpOptions";


export default function SettleUpAnimation({
  menu,
  pendingTransactions,
  memberIdSelectedToSettleUp,
  members
  
}: SettleUpAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "SettleUp"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <SettleUpOptions
        pendingTransactions={pendingTransactions}
        memberIdSelectedToSettleUp={memberIdSelectedToSettleUp}
        menu={menu}
        members={members}
      />
    </CSSTransition>
  );
}
