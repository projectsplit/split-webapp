import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import DeleteExpenseConfirmation from '../Menus/Confirmations/DeleteExpenseConfirmation';
export default function DeleteExpenseAnimation({ menu, description, selectedExpense, errorMessage, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'deleteExpense', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(DeleteExpenseConfirmation, { menu: menu, description: description, selectedExpense: selectedExpense, errorMessage: errorMessage }) }));
}
