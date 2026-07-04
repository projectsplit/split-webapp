import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import SearchUsersToInvite from '../../pages/SearchUsersToInvite';
import { useRef } from 'react';
export default function AddNewUserAnimation({ menu, guestToBeReplaced, newGroupId, newMembers, accessedNewUsersInvitationsMenu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'newUser', timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(SearchUsersToInvite, { menu: menu, guestToBeReplaced: guestToBeReplaced, newGroupId: newGroupId, newMembers: newMembers, accessedNewUsersInvitationsMenu: accessedNewUsersInvitationsMenu }) }));
}
