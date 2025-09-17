import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Selection from "./components/Selection/Selection";
import { AnalyticsYearSelectionAnimationProps } from "../../../../interfaces";

export default function AnalyticsYearSelectionAnimation({
  menu,
  header,
  children,
}: AnalyticsYearSelectionAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === "year"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <Selection header={header}>{children}</Selection>
    </CSSTransition>
  );
}
