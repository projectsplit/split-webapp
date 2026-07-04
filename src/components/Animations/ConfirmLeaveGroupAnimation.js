import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import ConfirmLeaveGroup from '../Menus/Confirmations/ConfirmLeaveGroup';
export default function ConfirmLeaveGroupAnimation({ menu, groupId, memberId, openGroupOptionsMenu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'leaveGroup', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ConfirmLeaveGroup, { menu: menu, groupId: groupId, memberId: memberId, openGroupOptionsMenu: openGroupOptionsMenu }) }));
}
