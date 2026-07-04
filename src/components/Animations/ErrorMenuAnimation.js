import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ErrorMenu from '../Menus/ErrorMenu/ErrorMenu';
export default function ErrorMenuAnimation({ menu, message, type, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'error', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ErrorMenu, { menu: menu, type: type, children: message }) }));
}
