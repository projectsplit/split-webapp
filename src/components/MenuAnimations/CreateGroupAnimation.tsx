
import { CSSTransition } from "react-transition-group";
import CreateGroup from "../../pages/Groups/CreateGroup/CreateGroup";
import { CreateGroupAnimationProps } from "../../interfaces";


export default function CreateGroupAnimation({
    menu
  }: CreateGroupAnimationProps) {
    return (
      <CSSTransition
        in={menu.value === "createGroup"}
        classNames="infoBox"
        timeout={100}
        unmountOnExit
      >
        <CreateGroup menu={menu}/>
      </CSSTransition>
    );
  }