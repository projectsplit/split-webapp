import { CSSTransition } from "react-transition-group";
import { MenuAnimationBackgroundProps } from "../../../interfaces";
import { useRef } from "react";

export default function MenuAnimationBackground({
  menu,
}: MenuAnimationBackgroundProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={Boolean(menu.value)}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          opacity: "0.7",
        }}
        onClick={() => (menu.value = null)}
      />
    </CSSTransition>
  );
}
