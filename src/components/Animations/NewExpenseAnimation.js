import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import CreateExpenseForm from '../CreateExpenseForm/CreateExpenseForm';
// import { ExpenseResponseItem } from "../../../types";
// import { useSignal } from "@preact/signals-react";
import { useRef } from 'react';
export default function NewExpenseAnimation({ groupId, timeZoneId, menu, timeZoneCoordinates, isPersonal, selectedExpense, groupMembers, currency, nonGroupUsers, isnonGroupExpense, nonGroupMenu, fromPersonal, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'newExpense', timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(CreateExpenseForm, { groupId: groupId, expense: null, timeZoneId: timeZoneId, menu: menu, timeZoneCoordinates: timeZoneCoordinates, header: "Create New Expense", isCreateExpense: true, selectedExpense: selectedExpense, isPersonal: isPersonal, groupMembers: groupMembers, currency: currency, nonGroupUsers: nonGroupUsers, isnonGroupExpense: isnonGroupExpense, nonGroupMenu: nonGroupMenu, fromPersonal: fromPersonal }) }));
}
