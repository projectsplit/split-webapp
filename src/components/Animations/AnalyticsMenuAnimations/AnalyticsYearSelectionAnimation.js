import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Selection from './components/Selection/Selection';
export default function AnalyticsYearSelectionAnimation({ menu, header, children, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: menu.value === 'year', timeout: 100, classNames: "bottomslide", unmountOnExit: true, children: _jsx(Selection, { header: header, children: children }) }));
}
