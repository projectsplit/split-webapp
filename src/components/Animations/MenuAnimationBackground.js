import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
export default function MenuAnimationBackground({ menu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: Boolean(menu.value), timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx("div", { ref: nodeRef, style: {
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
                opacity: '0.88',
            }, onClick: () => (menu.value = null) }) }));
}
