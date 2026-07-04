import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import SearchTransactions from '../SearchTransactions/SearchTransactions';
import { useRef } from 'react';
export default function SearchTransactionsAnimation({ menu, group, userInfo, timeZoneId, expenseParsedFilters, transferParsedFilters, isPersonal,
// nonGroupUsers
 }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'search', timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx("div", { ref: nodeRef, children: _jsx(SearchTransactions, { menu: menu, group: group, userInfo: userInfo, timeZoneId: timeZoneId, expenseParsedFilters: expenseParsedFilters, transferParsedFilters: transferParsedFilters, isPersonal: isPersonal }) }) }));
}
