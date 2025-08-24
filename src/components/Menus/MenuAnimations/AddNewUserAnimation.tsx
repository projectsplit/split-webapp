import { CSSTransition } from "react-transition-group";
import { AddNewUserAnimationProps } from "../../../interfaces";
import SearchUsersToInvite from "../../../pages/SearchUsersToInvite";

export default function AddNewUserAnimation({
  menu,
  groupName,
  guestId
}: AddNewUserAnimationProps) {
  return (
    <CSSTransition in={menu.value === "newUser"} timeout={0} unmountOnExit>
      <SearchUsersToInvite menu={menu} groupName={groupName} guestId={guestId}/>
    </CSSTransition>
  );
}
