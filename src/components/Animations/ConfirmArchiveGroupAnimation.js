import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import ConfirmArchiveGroup from '../Menus/Confirmations/ConfirmArchiveGroup';
export default function ConfirmArchiveGroupAnimation({ menu, groupId, openGroupOptionsMenu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'archiveGroup', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ConfirmArchiveGroup, { menu: menu, groupId: groupId, openGroupOptionsMenu: openGroupOptionsMenu, navigateToGroups: true }) }));
}
