import { CSSTransition } from "react-transition-group";

import { useRef } from "react";
import { NonGroupTransferAnimationProps } from "../../../interfaces";
import NonGroupTransferMenu from "../NonGroupUsersMenus/NonGroupTransferMenu/NonGroupTransferMenu";

export default function NonGroupTransferAnimation({
  nonGroupTransferMenu,
  nonGroupGroup,
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
        nonGroupGroup={nonGroupGroup}
        groupMembers={groupMembers}
        isNonGroupTransfer ={isNonGroupTransfer}
      />
    </CSSTransition>
  );
}
