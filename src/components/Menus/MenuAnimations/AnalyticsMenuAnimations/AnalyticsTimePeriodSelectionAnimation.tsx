import React from 'react'
import { CSSTransition } from "react-transition-group";
import Selection from "./components/Selection/Selection";
import { AnalyticsTimePeriodSelectionAnimationProps } from '../../../../interfaces';

export default function AnalyticsTimePeriodSelectionAnimation({
    menu,
    header,
    children,
  }: AnalyticsTimePeriodSelectionAnimationProps) {
  return (
    <CSSTransition
    in={menu.value === "timePeriod"}
    timeout={100}
    classNames="bottomslide"
    unmountOnExit
  >
   <Selection header={header}>{children}</Selection>
  </CSSTransition>
  )
}
