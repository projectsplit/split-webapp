import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import TransferForm from '../TransferForm/TransferForm';
import { useRef } from 'react';
export default function NewTransferAnimation({ timeZoneId, menu, groupMembers, nonGroupUsers, currency, isnonGroupTransfer, groupId, nonGroupMenu, fromHomeGroup, fromHome, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'newTransfer', timeout: 0, unmountOnExit: true, nodeRef: nodeRef, children: _jsx(TransferForm, { groupId: groupId, timeZoneId: timeZoneId, menu: menu, groupMembers: groupMembers, nonGroupUsers: nonGroupUsers, currency: currency, isnonGroupTransfer: isnonGroupTransfer, nonGroupMenu: nonGroupMenu, fromHomeGroup: fromHomeGroup, fromHome: fromHome }) }));
}
