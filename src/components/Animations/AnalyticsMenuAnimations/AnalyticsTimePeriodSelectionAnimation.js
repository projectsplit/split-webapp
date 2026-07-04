import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Selection from './components/Selection/Selection';
export default function AnalyticsTimePeriodSelectionAnimation({ menu, header, children, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'timePeriod', timeout: 100, classNames: "bottomslide", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(Selection, { header: header, children: children }) }));
}
