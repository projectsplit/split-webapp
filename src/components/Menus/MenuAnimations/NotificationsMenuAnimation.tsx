import { CSSTransition } from "react-transition-group";
import NotificationsMenu from "../NotificationsMenu/NotificationsMenu";
import { useRef } from "react";
import { NotificationsMenuAnimationProps } from "../../../interfaces";

export default function NotificationsMenuAnimation({
  menu,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  userInvitations,
  userInfo
}: NotificationsMenuAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "notifications"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <NotificationsMenu
        menu={menu}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        userInvitations={userInvitations}
        userInfo={userInfo}
      />
    </CSSTransition>
  );
}
