import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import EditExpenseForm from '../EditExpenseForm/EditExpenseForm';
import { useRef } from 'react';
export default function EditExpenseAnimation({ groupId, timeZoneId, menu, expense, selectedExpense, timeZoneCoordinates, isPersonal, groupMembers, currency, isnonGroupExpense, nonGroupUsers, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'editExpense', timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(EditExpenseForm, { groupId: groupId, expense: expense, timeZoneId: timeZoneId, menu: menu, selectedExpense: selectedExpense, timeZoneCoordinates: timeZoneCoordinates, header: "Edit Expense", isCreateExpense: false, isPersonal: isPersonal, groupMembers: groupMembers, currency: currency, isnonGroupExpense: isnonGroupExpense, nonGroupUsers: nonGroupUsers }) }));
}
