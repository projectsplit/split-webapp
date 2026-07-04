import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import Join from './Join';
import { CSSTransition } from 'react-transition-group';
export const JoinOverlay = () => {
    const nodeRef = useRef(null);
    return (_jsxs(_Fragment, { children: [_jsx(CSSTransition, { in: true, timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx("div", { ref: nodeRef, style: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'black',
                        opacity: '0.7',
                        zIndex: 998,
                    } }) }), _jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, children: _jsx(Join, {}) })] }));
};
