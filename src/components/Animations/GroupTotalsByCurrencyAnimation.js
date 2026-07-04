import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { GroupTotalsByCurrency } from '../../pages/TransactionsWrappers/GroupTotalsByCurrency/GroupTotalsByCurrency';
export default function GroupTotalsByCurrencyAnimation({ menu, bar1Color, bar2Color, bar1Legend, bar2Legend, groupTotalsByCurrency, userTotalsByCurrency, mode, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'epensesByCurrency', classNames: "infoBox", timeout: 100, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(GroupTotalsByCurrency, { menu: menu, bar1Color: bar1Color, bar2Color: bar2Color, bar1Legend: bar1Legend, bar2Legend: bar2Legend, groupTotalsByCurrency: groupTotalsByCurrency, userTotalsByCurrency: userTotalsByCurrency, mode: mode }) }));
}
