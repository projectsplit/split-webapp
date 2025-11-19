import { CSSTransition } from "react-transition-group";

import { useRef } from "react";
import { NonGroupTransferUsersAnimationProps } from "../../../interfaces";
import NonGroupTransferUsersMenu from "../NonGroupUsersMenus/NonGroupTransferUsersMenu/NonGroupTransferUsersMenu";

export default function NonGroupTransferUsersAnimation({
  nonGroupTransferMenu,

}: NonGroupTransferUsersAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={nonGroupTransferMenu.value.menu === "nonGroupTransferUsers"}
      timeout={100}
      unmountOnExit
    >
      <NonGroupTransferUsersMenu
        nonGroupTransferMenu={nonGroupTransferMenu}

      />
    </CSSTransition>
  );
}
