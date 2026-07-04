import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import EditUsername from '../Menus/EditUsername/EditUsername';
export default function EditUsernameAnimation({ editUsernameMenu, existingUsername, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: editUsernameMenu.value === 'editUsername', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(EditUsername, { existingUsername: existingUsername, editUsernameMenu: editUsernameMenu }) }));
}
