import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { NonGroupExpenseUsersMenu } from '../Menus/NonGroupUsersMenus/NonGroupExpenseUsersMenu/NonGroupExpenseUsersMenu';
export default function NonGroupExpenseUsersAnimation({ menu, nonGroupUsers, isPersonal, groupMembers, fromHomeGroup, isNonGroupExpense, fromNonGroup, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: menu.value === 'nonGroupExpenseUsers', timeout: 100, unmountOnExit: true, children: _jsx(NonGroupExpenseUsersMenu, { menu: menu, nonGroupUsers: nonGroupUsers, isPersonal: isPersonal, groupMembers: groupMembers, fromHomeGroup: fromHomeGroup, isNonGroupExpense: isNonGroupExpense, fromNonGroup: fromNonGroup }) }));
}
