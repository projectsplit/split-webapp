import { CSSTransition } from "react-transition-group";
import { HomeQuickActionsAnimationProps } from "../../../interfaces";
import { useRef } from "react";
import HomeQuickActionsMenu from "../HomeQuickActionsMenu/HomeQuickActionsMenu";

export default function HomeQuickActionsAnimation({
  quickActionsMenu,
  isNonGroupExpense,
  nonGroupTransferMenu,
  userInfo,
}: HomeQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={quickActionsMenu.value === "quickActions"}
      timeout={100}
      classNames="quick-actions"
      unmountOnExit
    >
      <HomeQuickActionsMenu
        quickActionsMenu={quickActionsMenu}
        isNonGroupExpense={isNonGroupExpense}
        nonGroupTransferMenu={nonGroupTransferMenu}
        userInfo={userInfo}
      />
    </CSSTransition>
  );
}
