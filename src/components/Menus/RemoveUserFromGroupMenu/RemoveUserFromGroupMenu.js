import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledRemoveUserFromGroup } from './RemoveUserFromGroup.styled';
import Separator from '../../Separator/Separator';
import Input from '../../Input/Input';
import { FaAngleLeft, FaUsersSlash } from 'react-icons/fa';
import { useSignal } from '@preact/signals-react';
import MemberItem from './MemberItem/MemberItem';
import MenuAnimationBackground from '../../Animations/MenuAnimationBackground';
import useGroup from '../../../api/auth/QueryHooks/useGroup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import RemoveWarningAnimation from '../../Animations/RemoveWarningAnimation';
import { useRemoveMemberFromGroup } from '../../../api/auth/CommandHooks/useRemoveMemberFromGroup';
export default function RemoveUserFromGroupMenu({ openRemoveUserMenu, groupId, userInfo, }) {
    const queryClient = useQueryClient();
    const noGroupError = useSignal('');
    const noMemberError = useSignal('');
    const cannotBeRemovedClickedWarning = useSignal(null);
    const cannotRemoveMemberWarning = useSignal(null);
    const [searchItem, setSearchItem] = useState('');
    const [memberClicked, setMemberClicked] = useState({ name: '', id: '' });
    const { data: group } = useGroup(groupId);
    const groupUsers = group?.members.filter((m) => m.userId !== userInfo?.userId) ?? [];
    const groupGuests = group?.guests ?? [];
    const combinedMembers = [...groupUsers, ...groupGuests];
    const filteredMembers = combinedMembers.filter((member) => member.name.toLowerCase().includes(searchItem.toLowerCase()));
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
    };
    const handleCannotRemoveGuest = () => {
        cannotBeRemovedClickedWarning.value = 'cannotRemoveGuest';
    };
    const handleCannotRemoveMember = (member) => {
        setMemberClicked({ name: member.name, id: member.id });
        cannotRemoveMemberWarning.value = 'userWarning';
    };
    const refetchGroupData = async () => {
        try {
            await queryClient.invalidateQueries({
                queryKey: [groupId],
                exact: false,
            });
        }
        catch (error) {
            console.error('Error refetching queries:', error);
        }
    };
    const handleCloseButton = async () => {
        openRemoveUserMenu.value = false;
        await refetchGroupData();
    };
    useEffect(() => {
        return () => {
            if (openRemoveUserMenu.value) {
                refetchGroupData();
            }
        };
    }, [openRemoveUserMenu, groupId, queryClient]);
    const { mutate: removeUser, isPending: isPendingMember } = useRemoveMemberFromGroup(groupId, noGroupError, noMemberError, cannotRemoveMemberWarning);
    return (_jsxs(StyledRemoveUserFromGroup, { children: [_jsxs("div", { className: "fixed-header-container", children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "closeButtonContainer", onClick: handleCloseButton, children: _jsx(FaAngleLeft, { className: "closeButton" }) }), _jsx("div", { className: "title", children: "Select members to remove" }), _jsx("div", { className: "gap" })] }), _jsx(Separator, {})] }), _jsxs("div", { className: "scrollable-content", children: [_jsx("div", { className: "inputField", children: _jsx(Input, { className: "search-input", placeholder: "Search", backgroundcolor: "#2d2d2d", onChange: handleInputChange }) }), _jsxs("div", { className: "members", children: [filteredMembers.map((member) => (_jsx(MemberItem, { groupId: group?.id, member: member, noGroupError: noGroupError, noMemberError: noMemberError, isGuest: 'canBeRemoved' in member, canBeRemoved: 'canBeRemoved' in member ? member.canBeRemoved : false, onCannotRemoveClick: 'canBeRemoved' in member
                                    ? handleCannotRemoveGuest
                                    : () => handleCannotRemoveMember(member) }, member.id))), filteredMembers.length === 0 && (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "No members found" }), _jsx(FaUsersSlash, { className: "icon" })] }))] })] }), _jsx(MenuAnimationBackground, { menu: cannotBeRemovedClickedWarning }), _jsx(MenuAnimationBackground, { menu: cannotRemoveMemberWarning }), _jsx(RemoveWarningAnimation, { menu: cannotBeRemovedClickedWarning, message: "This guest cannot be removed because they are involved in expenses or transfers. Removing them will disrupt the group's financial history.", menuValue: "cannotRemoveGuest", header: "Info" }), _jsx(RemoveWarningAnimation, { menu: cannotRemoveMemberWarning, message: `Are you sure you want to remove ${memberClicked.name}? ${memberClicked.name} will be replaced by guest`, menuValue: "userWarning", header: "Warning!", onConfirm: () => removeUser(memberClicked.id), isLoading: isPendingMember })] }));
}
