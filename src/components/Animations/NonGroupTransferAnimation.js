import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import NonGroupTransferMenu from '../Menus/NonGroupUsersMenus/NonGroupTransferMenu/NonGroupTransferMenu';
export default function NonGroupTransferAnimation({ nonGroupTransferMenu, fromHomeGroup, groupMembers, isNonGroupTransfer, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: nonGroupTransferMenu.value.menu === 'nonGroupTransfer', timeout: 100, unmountOnExit: true, children: _jsx(NonGroupTransferMenu, { nonGroupTransferMenu: nonGroupTransferMenu, fromHomeGroup: fromHomeGroup, groupMembers: groupMembers, isNonGroupTransfer: isNonGroupTransfer }) }));
}
