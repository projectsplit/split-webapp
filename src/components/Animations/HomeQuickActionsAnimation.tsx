import { CSSTransition } from "react-transition-group";
import { HomeQuickActionsAnimationProps } from "../../interfaces";
import { useRef } from "react";
import ActionsMenu from "../Menus/ActionsMenu/ActionsMenu";

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
      <ActionsMenu
        onClickExpense={() => {
          quickActionsMenu.value = "newExpense";
          isNonGroupExpense.value = true;
        }}
        onClickTransfer={() => {
          quickActionsMenu.value = "newTransfer";
          nonGroupTransferMenu.value = {
            attribute: "",
            menu: null,
            senderId: userInfo.userId,
            senderName: "You",
            receiverId: "",
            receiverName: "",
          };
        }}
        bottom={100}
      />
    </CSSTransition>
  );
}
