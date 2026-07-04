import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import CreateGroup from '../../pages/Groups/CreateGroup/CreateGroup';
import { useRef } from 'react';
export default function CreateGroupAnimation({ menu, currencyMenu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'createGroup', classNames: "infoBox", timeout: 100, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(CreateGroup, { menu: menu, currencyMenu: currencyMenu, nodeRef: nodeRef }) }));
}
