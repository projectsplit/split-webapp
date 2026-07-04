import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import TimeZoneOptions from '../Menus/TimeZoneOptions/TimeZoneOptions';
import { useRef } from 'react';
export default function TimeZoneOptionsAnimation({ timeZoneMenu, clickHandler, userInfo, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: timeZoneMenu.value === 'timeZones', timeout: 100, classNames: "bottomslide", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(TimeZoneOptions, { clickHandler: clickHandler, userInfo: userInfo }) }));
}
