import { CSSTransition } from "react-transition-group";
import TimeZoneOptions from "../Menus/TimeZoneOptions/TimeZoneOptions";
import { TimeZoneOptionsAnimationProps } from "../../interfaces";
import { useRef } from "react";

export default function TimeZoneOptionsAnimation({
  timeZoneMenu,
  clickHandler,
  userInfo,
}: TimeZoneOptionsAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={timeZoneMenu.value === "timeZones"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <TimeZoneOptions clickHandler={clickHandler} userInfo={userInfo} />
    </CSSTransition>
  );
}
