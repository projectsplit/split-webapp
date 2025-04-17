import { CSSTransition } from "react-transition-group";
import { GroupTotalExpensesByCurrencyAnimationProps } from "../../../interfaces";
import { useRef } from "react";
import { GroupTotalExpensesByCurrency } from "../../../pages/Expenses/GroupTotalExpensesByCurrency/GroupTotalExpensesByCurrency";

export default function GroupTotalExpensesByCurrencyAnimation({
  menu,
  bar1Color,
  bar2Color,
  bar1Legend,
  bar2Legend,
  groupTotalsByCurrency,
  userTotalsByCurrency,
}: GroupTotalExpensesByCurrencyAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "epensesByCurrency"}
      classNames="infoBox"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <GroupTotalExpensesByCurrency
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
