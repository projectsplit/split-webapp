import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import SettingsMenu from '../Menus/SettingsMenu/SettingsMenu';
export default function SettingsMenuAnimation({ menu, userInfo, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'settings', classNames: "leftslide", timeout: 100, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(SettingsMenu, { menu: menu, userInfo: userInfo, nodeRef: nodeRef }) }));
}
