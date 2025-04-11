import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { RemoveGuestWarningAnimationProps } from "../../../interfaces";
import RemoveGuestWarning from "../RemoveGuestWarning/RemoveGuestWarning";

export default function RemoveGuestWarningAnimation({
  menu,
}: RemoveGuestWarningAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "cannotRemoveGuest"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <RemoveGuestWarning menu={menu} />
    </CSSTransition>
  );
}
