import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InviteUsersToNewGroup } from '../Menus/InviteUsersToNewGroupMenu/InviteUsersToNewGroup';
export default function InviteUsersToNewGroupAnimation({ menu, newGroup, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'inviteUsersToNewGroup', classNames: "infoBox", timeout: 100, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(InviteUsersToNewGroup, { menu: menu, newGroup: newGroup, nodeRef: nodeRef }) }));
}
