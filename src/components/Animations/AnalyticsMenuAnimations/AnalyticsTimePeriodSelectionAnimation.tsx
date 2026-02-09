import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Selection from "./components/Selection/Selection";
import { AnalyticsTimePeriodSelectionAnimationProps } from "../../../interfaces";

export default function AnalyticsTimePeriodSelectionAnimation({
  menu,
  header,
  children,
}: AnalyticsTimePeriodSelectionAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "timePeriod"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <Selection header={header}>{children}</Selection>
    </CSSTransition>
  );
}
