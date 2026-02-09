import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { EditUsernameAnimationProps } from "../../interfaces";
import EditUsername from "../Menus/EditUsername/EditUsername";

export default function EditUsernameAnimation({
  editUsernameMenu,
  existingUsername,
}: EditUsernameAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={editUsernameMenu.value === "editUsername"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <EditUsername
        existingUsername={existingUsername}
        editUsernameMenu={editUsernameMenu}
      />
    </CSSTransition>
  );
}
