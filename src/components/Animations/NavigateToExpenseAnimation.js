import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavigateToExpenseConfirmation } from '../Menus/Confirmations/NavigateToExpenseConfirmation';
export default function NavigateToExpenseAnimation({ menu, selectedExpense, errorMessage, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'navigateToExpense', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(NavigateToExpenseConfirmation, { menu: menu, selectedExpense: selectedExpense, errorMessage: errorMessage }) }));
}
