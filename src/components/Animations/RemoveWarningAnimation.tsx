import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { RemoveWarningAnimationProps } from "../../interfaces";

import RemoveWarning from "../Menus/RemoveWarning/RemoveWarning";

export default function RemoveWarningAnimation({
  menu,
  message,
  menuValue,
  header,
  onConfirm,
  isLoading
}: RemoveWarningAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === menuValue}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <RemoveWarning menu={menu} message={message} header={header} onConfirm={onConfirm} isLoading={isLoading} />
    </CSSTransition>
  );
}
