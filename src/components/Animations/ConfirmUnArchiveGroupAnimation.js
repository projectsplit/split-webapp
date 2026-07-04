import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import ConfirmUnArchiveGroup from '../Menus/Confirmations/ConfirmUnArchiveGroup';
export default function ConfirmUnArchiveGroupAnimation({ menu, groupId, openGroupOptionsMenu, navigateToGroups, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'unarchiveGroup', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ConfirmUnArchiveGroup, { menu: menu, groupId: groupId, openGroupOptionsMenu: openGroupOptionsMenu, navigateToGroups: navigateToGroups }) }));
}
