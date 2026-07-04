import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectedGroup } from '@/components/Menus/NonGroupUsersMenus/SelectionLists/SelectedGroup';
import SendMenuWrapper from '../SendMenuWrapper/SendMenuWrapper';
import { StyledGroupMenu } from './GroupMenu.styled';
export const GroupMenu = ({ fromHomeGroup, isnonGroupTransfer, idError, data, actions, userMemberId, sortedMembers, }) => {
    return (_jsxs(StyledGroupMenu, { children: [fromHomeGroup && isnonGroupTransfer && (_jsxs("div", { className: "nonGroupGroupPill", children: [_jsx(SelectedGroup, { group: fromHomeGroup.value, onRemove: () => {
                            fromHomeGroup.value = null;
                            isnonGroupTransfer.value = true;
                        } }), _jsx("div", {})] })), _jsx(SendMenuWrapper, { title: "Sender", idError: idError, id: data.senderId, setId: actions.toggleSenderId, setShowIdError: (val) => actions.setError('showIdError', val), userMemberId: userMemberId, showIdError: data.errors.showIdError, sortedMembers: sortedMembers }), _jsx(SendMenuWrapper, { title: "Receiver", idError: idError, id: data.receiverId, setId: actions.toggleReceiverId, setShowIdError: (val) => actions.setError('showIdError', val), userMemberId: userMemberId, showIdError: data.errors.showIdError, sortedMembers: sortedMembers })] }));
};
