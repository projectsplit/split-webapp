import { CSSTransition } from "react-transition-group";

import { useRef } from "react";
import { NonGroupTransferAnimationProps } from "../../interfaces";
import NonGroupTransferMenu from "../Menus/NonGroupUsersMenus/NonGroupTransferMenu/NonGroupTransferMenu";

export default function NonGroupTransferAnimation({
  nonGroupTransferMenu,
  fromHomeGroup,
  groupMembers,
  isNonGroupTransfer
}: NonGroupTransferAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={nonGroupTransferMenu.value.menu === "nonGroupTransfer"}
      timeout={100}
      unmountOnExit
    >
      <NonGroupTransferMenu
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={fromHomeGroup}
        groupMembers={groupMembers}
        isNonGroupTransfer={isNonGroupTransfer}
      />
    </CSSTransition>
  );
}
