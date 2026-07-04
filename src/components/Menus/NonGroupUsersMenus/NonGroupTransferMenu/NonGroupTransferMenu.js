import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledNonGroupTransferUsersMenu } from './NonGroupTransferMenu.styled';
import { BiArrowBack } from 'react-icons/bi';
import MyButton from '../../../MyButton/MyButton';
import AutoWidthInput from '../../../AutoWidthInput';
import Sentinel from '../../../Sentinel';
import { useCallback, useMemo, useRef, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { useOutletContext } from 'react-router-dom';
import User from '../User/User';
import { useSearchGroupsByName } from '../../../../api/auth/QueryHooks/useSearchGroupsByName';
import Item from '../Item/Item';
import { SelectedGroup } from '../SelectionLists/SelectedGroup';
import Spinner from '../../../Spinner/Spinner';
import { useSearchUsers } from '@/api/auth/QueryHooks/useSearchUsers';
import { useGetConnectionStatuses } from '@/api/auth/QueryHooks/useGetConnectionStatuses';
import { useSendConnectionRequest } from '@/api/auth/CommandHooks/useSendConnectionRequest';
import { useAcceptConnectionRequest } from '@/api/auth/CommandHooks/useAcceptConnectionRequest';
import ConnectableUserItem from '../ConnectableUserItem/ConnectableUserItem';
import ConnectRequestConfirm from '../ConnectRequestConfirm/ConnectRequestConfirm';
export default function NonGroupTransferMenu({ nonGroupTransferMenu, fromHomeGroup, groupMembers, isNonGroupTransfer, }) {
    const pageSize = 10;
    const [keyword, setKeyword] = useState('');
    // const [selectedUser, setSelectedUser] = useState<string>('')
    const [debouncedKeyword, isDebouncing] = useDebounce(keyword.length > 1 ? keyword : '', 300);
    const mainRef = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const { userInfo } = useOutletContext();
    const handleInputChange = useCallback((e) => {
        setKeyword(e.target.value);
    }, []);
    const handleSuggestedUserClick = (userId, username) => {
        const displayName = username === userInfo.username ? 'You' : username;
        const isSelf = userId === userInfo.userId;
        const menu = nonGroupTransferMenu.value;
        const isSenderMode = menu.attribute === 'sender';
        if (isSelf) {
            if (isSenderMode) {
                nonGroupTransferMenu.value = {
                    ...menu,
                    receiverId: userInfo.userId,
                    receiverName: 'You',
                    senderId: menu.senderId,
                    senderName: menu.senderName,
                };
            }
            else {
                nonGroupTransferMenu.value = {
                    ...menu,
                    senderId: userInfo.userId,
                    senderName: 'You',
                    receiverId: menu.receiverId,
                    receiverName: menu.receiverName,
                };
            }
            return;
        }
        if (isSenderMode) {
            nonGroupTransferMenu.value = {
                ...menu,
                senderId: userId,
                senderName: displayName,
                receiverId: userInfo.userId,
                receiverName: 'You',
            };
        }
        else {
            nonGroupTransferMenu.value = {
                ...menu,
                receiverId: userId,
                receiverName: displayName,
                senderId: userInfo.userId,
                senderName: 'You',
            };
        }
    };
    const handleFocus = () => {
        inputRef.current?.focus();
    };
    const result = useSearchUsers(debouncedKeyword, pageSize);
    const searchedUserIds = (result.data?.pages.flatMap((x) => x.users) ?? [])
        .map((u) => u.userId)
        .filter((id) => id !== userInfo.userId);
    const { data: connectionStatuses } = useGetConnectionStatuses(searchedUserIds);
    const sendConnectionRequest = useSendConnectionRequest();
    const acceptConnectionRequest = useAcceptConnectionRequest();
    const [connectTarget, setConnectTarget] = useState(null);
    const statusByUserId = useMemo(() => {
        return new Map(connectionStatuses?.statuses.map((s) => [s.userId, s]) ?? []);
    }, [connectionStatuses]);
    if (!result)
        return null;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = result;
    const users = data?.pages.flatMap((x) => x.users) ?? [];
    const { data: userGroups, isFetching: groupsAreFetching } = useSearchGroupsByName(debouncedKeyword, pageSize);
    const remainingSuggestedGroups = useMemo(() => {
        return (userGroups?.pages
            .flatMap((x) => x.groups)
            .filter((x) => fromHomeGroup.value?.id !== x.id) ?? []);
    }, [userGroups, fromHomeGroup.value]);
    const isEmpty = useMemo(() => keyword.length === 0 && !fromHomeGroup.value, [fromHomeGroup.value, keyword]);
    const handleSuggestedGroupClick = useCallback((groupId) => {
        const existingGroup = userGroups?.pages
            .flatMap((x) => x.groups)
            .find((x) => x.id === groupId);
        if (!existingGroup)
            return;
        isNonGroupTransfer.value = false;
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
    const handleSelectedGroupCick = () => {
        fromHomeGroup.value = null;
        groupMembers.value = [];
        isNonGroupTransfer.value = true;
    };
    return (_jsxs(StyledNonGroupTransferUsersMenu, { children: [_jsx("div", { className: "fixedHeader", children: _jsxs("div", { className: "header", children: [_jsx("div", { className: "closeButtonContainer", children: _jsx(BiArrowBack, { className: "backButton", onClick: () => {
                                    nonGroupTransferMenu.value = {
                                        ...nonGroupTransferMenu.value,
                                        menu: null,
                                    };
                                } }) }), _jsx("div", { className: "title", children: nonGroupTransferMenu.value.attribute === 'sender'
                                ? 'Select sender'
                                : nonGroupTransferMenu.value.attribute === 'receiver'
                                    ? 'Select receiver'
                                    : 'Select Group' }), _jsx("div", { className: "gap" })] }) }), _jsxs("div", { className: "scrollable-content", children: [_jsx("div", { className: "inputField", children: _jsxs("div", { className: "main", onFocus: () => handleFocus(), 
                            // onBlur={handleBlur}
                            ref: mainRef, tabIndex: 0, children: [_jsx(SelectedGroup, { group: fromHomeGroup.value, onRemove: handleSelectedGroupCick }), _jsx(AutoWidthInput, { className: "input", inputMode: "text", autoComplete: "off", autoCorrect: "off", spellCheck: false, value: keyword, onChange: (e) => handleInputChange(e), ref: inputRef, isText: true }), isEmpty && _jsx("div", { className: "search-annotation", children: "Search" })] }) }), _jsx("div", { className: "dropdown", ref: dropdownRef, children: isFetching || groupsAreFetching ? (_jsx("div", { className: "spinner", children: _jsx(Spinner, {}) })) : users.length > 0 &&
                            (nonGroupTransferMenu.value.attribute === 'sender' ||
                                nonGroupTransferMenu.value.attribute === 'receiver') ? (users.map((user) => {
                            const isSelf = user.userId === userInfo.userId;
                            const status = statusByUserId.get(user.userId)?.status;
                            return isSelf || status === 'connected' ? (_jsx(User, { currentUserId: userInfo.userId, name: user.username, userId: user.userId, nonGroupTransferMenu: nonGroupTransferMenu, onClick: (e) => {
                                    e.stopPropagation();
                                    handleSuggestedUserClick(user.userId, user.username);
                                } }, user.userId)) : (_jsx(ConnectableUserItem, { name: user.username, status: status, onSelect: (e) => {
                                    e.stopPropagation();
                                    handleSuggestedUserClick(user.userId, user.username);
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
                                } }, user.userId));
                        })) : (remainingSuggestedGroups.length > 0 && (_jsx("div", { className: "dropdown", ref: dropdownRef, children: remainingSuggestedGroups.map((group) => (_jsx(Item, { name: group.name, onClick: (e) => {
                                    e.stopPropagation();
                                    handleSuggestedGroupClick(group.id);
                                } }, group.id))) }))) }), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] }), _jsx("div", { className: "doneButton", children: _jsx(MyButton, { onClick: () => {
                        nonGroupTransferMenu.value = {
                            ...nonGroupTransferMenu.value,
                            menu: null,
                        };
                    }, children: "Done" }) }), connectTarget && (_jsx(ConnectRequestConfirm, { username: connectTarget.username, isLoading: sendConnectionRequest.isPending, onConfirm: () => sendConnectionRequest.mutate(connectTarget.userId, {
                    onSettled: () => setConnectTarget(null),
                }), onCancel: () => setConnectTarget(null) }))] }));
}
