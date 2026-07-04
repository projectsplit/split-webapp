import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import MakeBudgetActiveMenu from '../Menus/MakeBudgetActiveMenu/MakeBudgetActiveMenu';
export default function MakeBudgetActiveMenuAnimation({ menu, hasActiveBudgetData, hasInactiveBudgetData, onConfirm, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'makeBudgetActive', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(MakeBudgetActiveMenu, { menu: menu, title: "Budget Status", hasActiveBudgetData: hasActiveBudgetData, hasInactiveBudgetData: hasInactiveBudgetData, onConfirm: onConfirm }) }));
}
