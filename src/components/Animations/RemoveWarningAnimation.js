import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import RemoveWarning from '../Menus/RemoveWarning/RemoveWarning';
export default function RemoveWarningAnimation({ menu, message, menuValue, header, onConfirm, isLoading, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === menuValue, timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(RemoveWarning, { menu: menu, message: message, header: header, onConfirm: onConfirm, isLoading: isLoading }) }));
}
