import { CSSTransition } from "react-transition-group";
import { GroupTotalsByCurrencyAnimationProps } from "../../interfaces";
import { useRef } from "react";
import { GroupTotalsByCurrency } from "../../pages/TransactionsWrappers/GroupTotalsByCurrency/GroupTotalsByCurrency";


export default function GroupTotalsByCurrencyAnimation({
  menu,
  bar1Color,
  bar2Color,
  bar1Legend,
  bar2Legend,
  groupTotalsByCurrency,
  userTotalsByCurrency,
}: GroupTotalsByCurrencyAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "epensesByCurrency"}
      classNames="infoBox"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <GroupTotalsByCurrency
        menu={menu}
        bar1Color={bar1Color}
        bar2Color={bar2Color}
        bar1Legend={bar1Legend}
        bar2Legend={bar2Legend}
        groupTotalsByCurrency={groupTotalsByCurrency}
        userTotalsByCurrency={userTotalsByCurrency}
      />
    </CSSTransition>
  );
}
