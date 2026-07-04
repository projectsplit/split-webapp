import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import ActionsMenu from '../Menus/ActionsMenu/ActionsMenu';
export default function GroupQuickActionsAnimation({ menu, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: menu.value === 'quickActions', timeout: 100, classNames: "bottomslide", unmountOnExit: true, children: _jsx(ActionsMenu, { onClickTransfer: () => (menu.value = 'newTransfer'), onClickExpense: () => (menu.value = 'newExpense'), bottom: 30 }) }));
}
