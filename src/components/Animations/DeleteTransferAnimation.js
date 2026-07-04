import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import DeleteTransferConfirmation from '../Menus/Confirmations/DeleteTransferConfirmation';
export default function DeleteTransferAnimation({ menu, selectedTransfer, errorMessage, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { in: menu.value === 'deleteTransfer', timeout: 100, classNames: "infoBox", unmountOnExit: true, nodeRef: nodeRef, children: _jsx(DeleteTransferConfirmation, { menu: menu, selectedTransfer: selectedTransfer, errorMessage: errorMessage }) }));
}
