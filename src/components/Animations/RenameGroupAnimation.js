import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import RenameGroupMenu from '../Menus/RenameGroupMenu/RenameGroupMenu';
export default function RenameGroupAnimation({ menu, groupId, groupName, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'renameGroup', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(RenameGroupMenu, { menu: menu, groupId: groupId, groupName: groupName }) }));
}
