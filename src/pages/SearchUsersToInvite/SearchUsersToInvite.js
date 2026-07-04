import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyledSearchUsersToInvite } from './SearchUsersToInvite.styled';
import { useSearchUsersToInvite } from '../../api/auth/QueryHooks/useSearchUsersToInvite';
import Input from '../../components/Input/Input';
import MyButton from '../../components/MyButton/MyButton';
import { useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useSignal } from '@preact/signals-react';
import { useCreateGuest } from '../../api/auth/CommandHooks/useCreateGuest';
import { useQueryClient } from '@tanstack/react-query';
import useGroup from '../../api/auth/QueryHooks/useGroup';
import MemberItem from '../../components/Menus/RemoveUserFromGroupMenu/MemberItem/MemberItem';
import RemoveGuestWarningAnimation from '../../components/Animations/RemoveWarningAnimation';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import Sentinel from '../../components/Sentinel';
import { SearchResultItem } from './SearchResultItem/SearchResultItem';
import useDebounce from '../../hooks/useDebounce';
const SearchUsersToInvite = ({ menu, guestToBeReplaced, newGroupId, newMembers, accessedNewUsersInvitationsMenu, }) => {
    const params = useParams();
    const groupId = params.groupid || newGroupId || '';
    const pageSize = 10;
    const queryClient = useQueryClient();
    const [keyword, setKeyword] = useState('');
    const category = useSignal('Invite User');
    const cannotBeRemovedClickedWarning = useSignal('');
    const [guestName, setGuestName] = useState('');
    const userInvitationSent = useSignal(false);
    const noGroupError = useSignal('');
    const noMemberError = useSignal('');
    const [debouncedKeyword] = useDebounce(keyword.length > 1 ? keyword : '', 300);
    useEffect(() => {
        if (accessedNewUsersInvitationsMenu)
            accessedNewUsersInvitationsMenu.value = true;
    }, []);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, updateUserInvitationStatus, } = useSearchUsersToInvite(groupId, debouncedKeyword, pageSize, guestToBeReplaced?.guestId);
    const { mutate: createGuestExpenseMutation, isPending: isPendingCreateGuest, } = useCreateGuest(groupId, noGroupError, guestName, setGuestName);
    const { data: group } = useGroup(groupId);
    const groupGuests = group?.guests ?? [];
    const handleCannotRemoveClick = () => {
        cannotBeRemovedClickedWarning.value = 'cannotRemoveGuest';
    };
    return (_jsxs(StyledSearchUsersToInvite, { children: [_jsx("div", { className: "fixed-header-container", children: _jsxs("div", { className: "header", children: [_jsx("div", { className: "gap" }), guestToBeReplaced?.guestId && guestToBeReplaced?.guestId != '' ? ('') : (_jsx("div", { className: "title", children: _jsx(CategorySelector, { activeCat: 'Invite User', categories: {
                                    cat1: 'Invite User',
                                    cat2: 'Create Guest',
                                }, navLinkUse: false, activeCatAsState: category }) })), _jsx("div", { className: "closeButtonContainer", onClick: () => {
                                menu.value = null;
                                queryClient
                                    .invalidateQueries({
                                    queryKey: [groupId],
                                    exact: false,
                                })
                                    .catch((error) => {
                                    console.error('Failed to invalidate queries:', error);
                                });
                            }, children: _jsx(IoClose, { className: "closeButton" }) })] }) }), category.value === 'Invite User' ? (_jsxs("div", { className: "scrollable-content", children: [_jsx("div", { className: "inputField", children: _jsx(Input, { className: "search-input", placeholder: "Search", backgroundcolor: "#2d2d2d", onChange: (e) => setKeyword(e.target.value), value: keyword || '' }) }), data?.pages.flatMap((x) => x.users.map((user) => (_jsx(SearchResultItem, { userId: user.userId, username: user.username, isAlreadyInvited: user.isAlreadyInvited, isGroupMember: user.isGroupMember, groupId: groupId, guestId: guestToBeReplaced?.guestId, guestName: guestToBeReplaced?.guestName, onInviteSuccess: (wasInvited) => {
                            updateUserInvitationStatus(user.userId, wasInvited);
                            if (wasInvited) {
                                if (newMembers) {
                                    newMembers.value = [
                                        ...newMembers.value,
                                        { name: user.username, isUser: true },
                                    ];
                                }
                            }
                            else {
                                if (newMembers) {
                                    newMembers.value = newMembers.value.filter((m) => m.name !== user.username);
                                }
                            }
                        }, userInvitationSent: userInvitationSent }, user.userId)))), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] })) : (_jsxs("div", { className: "scrollable-content", children: [_jsxs("div", { className: "inputField", children: [_jsx(Input, { className: "search-input", placeholder: "guest's name", backgroundcolor: "#2d2d2d", onChange: (e) => setGuestName(e.target.value), value: guestName || '', autoFocus: true }), _jsx("div", { className: "createButton", children: _jsx(MyButton, { isLoading: isPendingCreateGuest, disabled: !guestName, onClick: () => createGuestExpenseMutation(undefined, {
                                        onSuccess: () => {
                                            if (newMembers) {
                                                newMembers.value = [
                                                    ...newMembers.value,
                                                    {
                                                        name: guestName,
                                                        isUser: false,
                                                    },
                                                ];
                                            }
                                        },
                                    }), children: "Create" }) })] }), _jsx("div", { className: "members", children: groupGuests.map((member) => (_jsx(MemberItem, { groupId: group?.id, member: member, noGroupError: noGroupError, noMemberError: noMemberError, isGuest: true, canBeRemoved: 'canBeRemoved' in member ? member.canBeRemoved : true, onCannotRemoveClick: handleCannotRemoveClick, newMembers: newMembers }, member.id))) })] })), _jsx(MenuAnimationBackground, { menu: cannotBeRemovedClickedWarning }), _jsx(RemoveGuestWarningAnimation, { menu: cannotBeRemovedClickedWarning, message: "This guest cannot be removed because they are involved in expenses or transfers. Removing them will disrupt the group's financial history.", menuValue: "cannotRemoveGuest", header: "Info" })] }));
};
export default SearchUsersToInvite;
