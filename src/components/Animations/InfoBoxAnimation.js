import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
export default function InfoBoxAnimation({ menu, children }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: menu.value === 'infoBox', timeout: 100, classNames: "infoBox", unmountOnExit: true, children: children }));
}
