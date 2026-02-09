import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { GeneralWarningMenuAnimationProps } from "../../interfaces";
import GeneralWarningMenu from "../Menus/GeneralWarningMenu/GeneralWarningMenu";

export default function GeneralWarningMenuAnimation({
  menu,
  message,
}: GeneralWarningMenuAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "generalWarning"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <GeneralWarningMenu menu={menu} message={message} />
    </CSSTransition>
  );
}
