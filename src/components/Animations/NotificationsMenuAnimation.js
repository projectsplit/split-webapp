import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import NotificationsMenu from '../Menus/NotificationsMenu/NotificationsMenu';
import { useRef } from 'react';
export default function NotificationsMenuAnimation({ menu, 
// fetchNextPage,
// hasNextPage,
// isFetchingNextPage,
// userInvitations,
userInfo, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'notifications', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(NotificationsMenu, { menu: menu, 
            // fetchNextPage={fetchNextPage}
            // hasNextPage={hasNextPage}
            // isFetchingNextPage={isFetchingNextPage}
            // userInvitations={userInvitations}
            userInfo: userInfo }) }));
}
