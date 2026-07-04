import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledNonGroupExpenseUsersMenu } from './NonGroupExpenseUsersMenu.styled';
import { CategorySelector } from '../../../CategorySelector/CategorySelector';
import { useSignal } from '@preact/signals-react';
import { BiArrowBack } from 'react-icons/bi';
import MyButton from '../../../MyButton/MyButton';
import Sentinel from '../../../Sentinel';
import { useCallback, useMemo, useRef, useState } from 'react';
import AutoWidthInput from '../../../AutoWidthInput';
import Item from '../Item/Item';
import { SelectedUsers } from '../SelectionLists/SelectedUsers';
import { useSearchGroupsByName } from '../../../../api/auth/QueryHooks/useSearchGroupsByName';
import { useOutletContext } from 'react-router-dom';
import useDebounce from '../../../../hooks/useDebounce';
import { SelectedGroup } from '../SelectionLists/SelectedGroup';
import { useSearchUsers } from '@/api/auth/QueryHooks/useSearchUsers';
import { MdOutlineGroupOff } from 'react-icons/md';
import { useGetConnectionStatuses } from '@/api/auth/QueryHooks/useGetConnectionStatuses';
import { useSendConnectionRequest } from '@/api/auth/CommandHooks/useSendConnectionRequest';
import { useAcceptConnectionRequest } from '@/api/auth/CommandHooks/useAcceptConnectionRequest';
import ConnectableUserItem from '../ConnectableUserItem/ConnectableUserItem';
import ConnectRequestConfirm from '../ConnectRequestConfirm/ConnectRequestConfirm';
export const NonGroupExpenseUsersMenu = ({ menu, nonGroupUsers, isPersonal, groupMembers, fromHomeGroup, isNonGroupExpense, fromNonGroup, }) => {
    const category = useSignal('Users');
    const [keyword, setKeyword] = useState('');
    const pageSize = 10;
    const [debouncedKeyword] = useDebounce(keyword.length > 1 ? keyword : '', 300);
    const inputRef = useRef(null);
    const mainRef = useRef(null);
    const dropdownRef = useRef(null);
    const { userInfo } = useOutletContext();
    const result = useSearchUsers(
    //TODO we need new endpoint to bring users (so we can do useSearchUsers)
    debouncedKeyword, pageSize);
    const searchedUserIds = (result.data?.pages.flatMap((x) => x.users) ?? [])
        .map((u) => u.userId)
        .filter((id) => id !== userInfo.userId);
    const { data: connectionStatuses } = useGetConnectionStatuses(searchedUserIds);
    const sendConnectionRequest = useSendConnectionRequest();
    const acceptConnectionRequest = useAcceptConnectionRequest();
    const [connectTarget, setConnectTarget] = useState(null);
    const statusByUserId = useMemo(() => {
        const map = new Map(connectionStatuses?.statuses.map((s) => [s.userId, s]) ?? []);
        return map;
    }, [connectionStatuses]);
    if (!result)
        return null;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = result;
    const { data: userGroups, fetchNextPage: fetchNextGroupsPage, hasNextPage: hasNextGroupsPage, isFetchingNextPage: isFetchingNextGroupsPage, } = useSearchGroupsByName(debouncedKeyword, pageSize);
    const handleFocus = () => {
        inputRef.current?.focus();
    };
    const handleSelectedUserCick = (userId) => {
        nonGroupUsers.value = nonGroupUsers.value.filter((x) => x.userId !== userId);
    };
    const handleSelectedGroupCick = () => {
        fromHomeGroup.value = null;
        groupMembers.value = [];
    };
    const addUser = (username) => {
        const trimmed = username.trim();
        const existingUser = data?.pages
            .flatMap((x) => x.users)
            .find((x) => x.username === trimmed);
        if (!existingUser) {
            // User not found in fetched data, keep keyword as-is or show error
            return;
        }
        const currentUser = {
            userId: userInfo.userId,
            username: userInfo.username,
        };
        if (!nonGroupUsers.value.map((x) => x.userId).includes(currentUser.userId)) {
            nonGroupUsers.value = [...nonGroupUsers.value, currentUser];
        }
        const newUser = {
            userId: existingUser.userId,
            username: existingUser.username,
        };
        if (!nonGroupUsers.value.map((x) => x.username).includes(newUser.username)) {
            nonGroupUsers.value = [...nonGroupUsers.value, newUser];
        }
        setKeyword('');
    };
    const handleSuggestedUserClick = useCallback((username) => {
        fromHomeGroup.value = null;
        groupMembers.value = [];
        addUser(username);
        isNonGroupExpense.value = true;
    }, [addUser]);
    const handleSuggestedGroupClick = useCallback((groupId) => {
        nonGroupUsers.value = []; //TODO need to only allow current user in
        const existingGroup = userGroups?.pages
            .flatMap((x) => x.groups)
            .find((x) => x.id === groupId && !x.isArchived);
        if (!existingGroup)
            return;
        ((fromHomeGroup.value = {
            id: existingGroup.id,
            name: existingGroup.name,
            created: existingGroup.created,
            updated: existingGroup.updated,
            ownerId: existingGroup.ownerId,
            members: existingGroup.members,
            labels: existingGroup.labels,
            isArchived: existingGroup.isArchived,
            guests: existingGroup.guests,
            currency: existingGroup.currency,
        }),
            (groupMembers.value = [
                ...existingGroup.members,
                ...existingGroup.guests,
            ]));
    }, [userGroups]);
    const handleInputChange = useCallback((e) => {
        setKeyword(e.target.value);
    }, []);
    const remainingSuggestedUsers = useMemo(() => {
        return (data?.pages
            .flatMap((x) => x.users)
            .filter((x) => !nonGroupUsers.value.some((u) => u.userId === x.userId)) ?? []);
    }, [data, nonGroupUsers.value]);
    const allActiveGroups = useMemo(() => {
        return (userGroups?.pages
            .flatMap((x) => x.groups)
            .filter((x) => !x.isArchived) ?? []);
    }, [userGroups]);
    const remainingSuggestedGroups = useMemo(() => {
        return allActiveGroups.filter((x) => fromHomeGroup.value?.id !== x.id);
    }, [allActiveGroups, fromHomeGroup.value]);
    const isEmpty = useMemo(() => {
        return ((nonGroupUsers.value?.length === 0 ||
            nonGroupUsers.value?.length === 1) &&
            keyword.length === 0 &&
            !fromHomeGroup.value);
    }, [nonGroupUsers.value, fromHomeGroup.value, keyword]);
    const isPersonalFn = () => {
        if (nonGroupUsers.value.length > 0 || groupMembers.value.length > 0) {
            isPersonal.value = false;
        }
        else {
            isPersonal.value = true;
        }
    };
    return (_jsxs(StyledNonGroupExpenseUsersMenu, { children: [_jsxs("div", { className: "fixedHeader", children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "closeButtonContainer", children: _jsx(BiArrowBack, { className: "backButton", onClick: () => {
                                        if (!fromNonGroup) {
                                            isPersonalFn();
                                        }
                                        menu.value = null;
                                    } }) }), _jsx("div", { className: "title", children: "Split expense with you and..." }), _jsx("div", { className: "gap" })] }), !fromNonGroup && (_jsx("div", { className: "categories", children: _jsx(CategorySelector, { activeCat: 'Amounts', categories: {
                                cat1: 'Users',
                                cat2: 'Groups',
                            }, navLinkUse: false, activeCatAsState: category }) }))] }), _jsxs("div", { className: "scrollable-content", children: [_jsx("div", { className: "inputField", children: _jsxs("div", { className: "main", onFocus: () => handleFocus(), 
                            // onBlur={handleBlur}
                            ref: mainRef, tabIndex: 0, children: [_jsx(SelectedUsers, { users: nonGroupUsers.value, onRemove: handleSelectedUserCick, currentUserId: userInfo.userId }), !fromNonGroup && (_jsx(SelectedGroup, { group: fromHomeGroup.value, onRemove: handleSelectedGroupCick })), _jsx(AutoWidthInput, { className: "input", inputMode: "text", autoComplete: "off", autoCorrect: "off", spellCheck: false, value: keyword, onChange: (e) => handleInputChange(e), ref: inputRef, isText: true }), isEmpty && _jsx("div", { className: "search-annotation", children: "Search" })] }) }), category.value === 'Users' ? (remainingSuggestedUsers.length > 0 && (_jsx("div", { className: "dropdown", ref: dropdownRef, children: remainingSuggestedUsers.map((user) => user.userId !== userInfo.userId ? (_jsx(ConnectableUserItem, { name: user.username, status: statusByUserId.get(user.userId)?.status, onSelect: (e) => {
                                e.stopPropagation();
                                handleSuggestedUserClick(user.username);
                            }, onRequest: (e) => {
                                e.stopPropagation();
                                setConnectTarget({
                                    userId: user.userId,
                                    username: user.username,
                                });
                            }, onAccept: (e) => {
                                e.stopPropagation();
                                const connectionId = statusByUserId.get(user.userId)?.connectionId;
                                if (connectionId) {
                                    acceptConnectionRequest.mutate(connectionId);
                                }
                            } }, user.userId)) : null) }))) : !fromNonGroup && remainingSuggestedGroups.length > 0 ? (_jsx("div", { className: "dropdown", ref: dropdownRef, children: remainingSuggestedGroups.map((group) => (_jsx(Item, { name: group.name, onClick: (e) => {
                                e.stopPropagation();
                                handleSuggestedGroupClick(group.id);
                                isNonGroupExpense.value = false;
                            } }, group.id))) })) : category.value === 'Groups' && !fromNonGroup ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: allActiveGroups.length === 0
                                    ? 'You are currently not a member of any active group'
                                    : 'No other groups to select from' }), _jsx(MdOutlineGroupOff, { className: "icon" })] })) : null, _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage }), !fromNonGroup && (_jsx(Sentinel, { fetchPage: fetchNextGroupsPage, hasMore: hasNextGroupsPage, isFetchingPage: isFetchingNextGroupsPage }))] }), _jsx("div", { className: "doneButton", children: _jsx(MyButton, { onClick: () => {
                        if (!fromNonGroup) {
                            isPersonalFn();
                        }
                        menu.value = null;
                    }, children: "Done" }) }), connectTarget && (_jsx(ConnectRequestConfirm, { username: connectTarget.username, isLoading: sendConnectionRequest.isPending, onConfirm: () => sendConnectionRequest.mutate(connectTarget.userId, {
                    onSettled: () => setConnectTarget(null),
                }), onCancel: () => setConnectTarget(null) }))] }));
};
