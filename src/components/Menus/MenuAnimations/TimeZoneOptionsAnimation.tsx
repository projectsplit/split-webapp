import { CSSTransition } from "react-transition-group";
import TimeZoneOptions from "../TimeZoneOptions/TimeZoneOptions";
import { TimeZoneOptionsAnimationProps } from "../../../interfaces";

export default function TimeZoneOptionsAnimation({
  timeZoneMenu,
  clickHandler,
  userInfo
}: TimeZoneOptionsAnimationProps) {
  return (
    <CSSTransition
      in={timeZoneMenu.value === "timeZones"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <TimeZoneOptions 
        clickHandler={clickHandler}
        userInfo={userInfo}
      />
    </CSSTransition>
  );
}
