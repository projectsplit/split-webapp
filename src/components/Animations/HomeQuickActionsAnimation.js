import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import ActionsMenu from '../Menus/ActionsMenu/ActionsMenu';
export default function HomeQuickActionsAnimation({ quickActionsMenu, isNonGroupExpense, nonGroupTransferMenu, fromHomeGroup, userInfo, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: quickActionsMenu.value === 'quickActions', timeout: 100, classNames: "quick-actions", unmountOnExit: true, children: _jsx(ActionsMenu, { onClickExpense: () => {
                quickActionsMenu.value = 'newExpense';
                if (!fromHomeGroup.value?.id) {
                    isNonGroupExpense.value = true;
                }
            }, onClickTransfer: () => {
                quickActionsMenu.value = 'newTransfer';
                nonGroupTransferMenu.value = {
                    attribute: '',
                    menu: null,
                    senderId: userInfo.userId,
                    senderName: 'You',
                    receiverId: '',
                    receiverName: '',
                };
            }, bottom: 100 }) }));
}
