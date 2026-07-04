import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import SettleUpOptions from '../../pages/Members/SettleUpOptions/SettleUpOptions';
import { useRef } from 'react';
export default function SettleUpAnimation({ menu, pendingTransactions, idSelectedToSettleUp, members, userId, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'SettleUp', timeout: 100, classNames: "bottomslide", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(SettleUpOptions, { pendingTransactions: pendingTransactions, idSelectedToSettleUp: idSelectedToSettleUp, menu: menu, members: members, userId: userId }) }));
}
