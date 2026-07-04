import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ParticipantsPayersErrorMenu from '../Menus/ParticipantsPayersErrorMenu/ParticipantsPayersErrorMenu';
export default function ParticipantsPayersAnimation({ menu, error, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'amountsError', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(ParticipantsPayersErrorMenu, { menu: menu, error: error }) }));
}
