import React from "react";
import { CSSTransition } from "react-transition-group";
import Selection from "./components/Selection/Selection";
import { AnalyticsSelectionAnimationProps } from "../../../../interfaces";

export default function AnalyticsCycleSelectionAnimation({
  menu,
  header,
  children,
}: AnalyticsSelectionAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "cycle"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <Selection header={header}>{children}</Selection>
    </CSSTransition>
  );
}
