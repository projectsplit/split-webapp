import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ErrorMenu from "../ErrorMenu/ErrorMenu";
import { ErrorMenuAnimationProps } from "../../../interfaces";

export default function ErrorMenuAnimation({
  menu,
  message,
}: ErrorMenuAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "error"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ErrorMenu menu={menu}>
        {message}
      </ErrorMenu>
    </CSSTransition>
  );
}
