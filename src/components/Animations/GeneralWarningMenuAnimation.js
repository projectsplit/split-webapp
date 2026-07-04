import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import GeneralWarningMenu from '../Menus/GeneralWarningMenu/GeneralWarningMenu';
export default function GeneralWarningMenuAnimation({ menu, message, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'generalWarning', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(GeneralWarningMenu, { menu: menu, message: message }) }));
}
