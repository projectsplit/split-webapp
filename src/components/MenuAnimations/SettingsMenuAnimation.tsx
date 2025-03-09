
import { CSSTransition } from "react-transition-group";
import { SettingsMenuAnimationProps } from "../../interfaces";
import { useRef } from "react";
import SettingsMenu from "../SettingsMenu/SettingsMenu";


export default function SettingsMenuAnimation({
    menu,
    username
  }: SettingsMenuAnimationProps) {
     const nodeRef = useRef(null);
    return (
      <CSSTransition
        in={menu.value === "settings"}
        classNames="leftslide"
        timeout={100}
        unmountOnExit
        nodeRef = {nodeRef}
      >
        <SettingsMenu menu={menu} username={username} nodeRef = {nodeRef}/>
      </CSSTransition>
    );
  }