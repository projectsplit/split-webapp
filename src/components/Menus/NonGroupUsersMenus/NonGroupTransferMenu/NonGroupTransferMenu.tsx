import { StyledNonGroupTransferUsersMenu } from './NonGroupTransferMenu.styled';
import { NonGroupTransferMenuProps } from '../../../../interfaces';
import BackButton from '../../../BackButton/BackButton';
import AutoWidthInput from '../../../AutoWidthInput';
import Sentinel from '../../../Sentinel';
import { useCallback, useMemo, useRef, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../../../types';
import User from '../User/User';
import { useSearchGroupsByName } from '../../../../api/auth/QueryHooks/useSearchGroupsByName';
import UserItem from '../UserItem/UserItem';
import { SelectedGroup } from '../SelectionLists/SelectedGroup';
import Spinner from '../../../Spinner/Spinner';
import { useSearchUsers } from '@/api/auth/QueryHooks/useSearchUsers';
import { useGetConnectionStatuses } from '@/api/auth/QueryHooks/useGetConnectionStatuses';
import { useSendConnectionRequest } from '@/api/auth/CommandHooks/useSendConnectionRequest';
import { useAcceptConnectionRequest } from '@/api/auth/CommandHooks/useAcceptConnectionRequest';
import { useRevokeConnectionRequest } from '@/api/auth/CommandHooks/useRevokeConnectionRequest';
import ConnectableUserItem from '../ConnectableUserItem/ConnectableUserItem';
import ConnectRequestConfirm from '../ConnectRequestConfirm/ConnectRequestConfirm';

export default function NonGroupTransferMenu({
  nonGroupTransferMenu,
  fromHomeGroup,
  groupMembers,
}: NonGroupTransferMenuProps) {
  const pageSize = 10;
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, isDebouncing] = useDebounce(
    keyword.length > 1 ? keyword : '',
    300
  );

  const mainRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  const handleSuggestedUserClick = (userId: string, username: string) => {
    const displayName = username === userInfo.username ? 'You' : username;
    const isSelf = userId === userInfo.userId;

    const menu = nonGroupTransferMenu.value;
    const isSenderMode = menu.attribute === 'sender';

    const onOtherSide = isSenderMode
      ? userId === menu.receiverId
      : userId === menu.senderId;

    if (onOtherSide) {
      nonGroupTransferMenu.value = {
        ...menu,
        menu: null,
        senderId: menu.receiverId,
        senderName: menu.receiverName,
        receiverId: menu.senderId,
        receiverName: menu.senderName,
      };
      return;
    }

    if (isSenderMode) {
      nonGroupTransferMenu.value = {
        ...menu,
        menu: null,
        senderId: userId,
        senderName: displayName,
        ...(isSelf
          ? {}
          : { receiverId: userInfo.userId, receiverName: 'You' }),
      };
    } else {
      nonGroupTransferMenu.value = {
        ...menu,
        menu: null,
        receiverId: userId,
        receiverName: displayName,
        ...(isSelf ? {} : { senderId: userInfo.userId, senderName: 'You' }),
      };
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: usersAreLoading,
    isPlaceholderData: usersAreStale,
  } = useSearchUsers(debouncedKeyword, pageSize);

  const { data: userGroups, isLoading: groupsAreLoading } =
    useSearchGroupsByName(debouncedKeyword, pageSize);

  const users = useMemo(
    () => data?.pages.flatMap((x) => x.users) ?? [],
    [data]
  );

  const searchedUserIds = useMemo(
    () => users.map((u) => u.userId).filter((id) => id !== userInfo.userId),
    [users, userInfo.userId]
  );

  const { data: connectionStatuses } =
    useGetConnectionStatuses(searchedUserIds);

  const sendConnectionRequest = useSendConnectionRequest();
  const acceptConnectionRequest = useAcceptConnectionRequest();
  const revokeConnectionRequest = useRevokeConnectionRequest();
  const [connectTarget, setConnectTarget] = useState<{
    userId: string;
    username: string;
  } | null>(null);

  const statusByUserId = useMemo(
    () => new Map(connectionStatuses?.statuses.map((s) => [s.userId, s]) ?? []),
    [connectionStatuses]
  );

  const remainingSuggestedGroups = useMemo(() => {
    return (
      userGroups?.pages
        .flatMap((x) => x.groups)
        .filter((x) => fromHomeGroup.value?.id !== x.id) ?? []
    );
  }, [userGroups, fromHomeGroup.value]);

  const isEmpty = useMemo(
    () => keyword.length === 0 && !fromHomeGroup.value,
    [fromHomeGroup.value, keyword]
  );

  const handleSuggestedGroupClick = useCallback(
    (groupId: string) => {
      const existingGroup = userGroups?.pages
        .flatMap((x) => x.groups)
        .find((x) => x.id === groupId);

      if (!existingGroup) return;
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
      nonGroupTransferMenu.value = {
        ...nonGroupTransferMenu.value,
        menu: null,
      };
    },
    [userGroups]
  );

  const handleSelectedGroupCick = () => {
    fromHomeGroup.value = null;
    groupMembers.value = [];
  };

  const isPickingUser =
    nonGroupTransferMenu.value.attribute === 'sender' ||
    nonGroupTransferMenu.value.attribute === 'receiver';
  const showUsers = isPickingUser && users.length > 0;

  const isTypingKeyword = isDebouncing && keyword.length > 1;

  const showSpinner = showUsers
    ? false
    : isPickingUser
      ? usersAreLoading || isTypingKeyword
      : groupsAreLoading;

  const showSearchingSpinner =
    isPickingUser && showUsers && (isTypingKeyword || usersAreStale);

  return (
    <StyledNonGroupTransferUsersMenu>
      <div className="fixedHeader">
        <div className="header">
          <BackButton
            onClick={() => {
              nonGroupTransferMenu.value = {
                ...nonGroupTransferMenu.value,
                menu: null,
              };
            }}
          />
          <div className="title">
            {nonGroupTransferMenu.value.attribute === 'sender'
              ? 'Select sender'
              : nonGroupTransferMenu.value.attribute === 'receiver'
                ? 'Select receiver'
                : 'Select Group'}
          </div>
          <div className="gap"></div>
        </div>
      </div>
      <div className="scrollable-content">
        <div className="inputField">
          <div
            className="main"
            onFocus={() => handleFocus()}
            ref={mainRef}
            tabIndex={0}
          >
            <SelectedGroup
              group={fromHomeGroup.value}
              onRemove={handleSelectedGroupCick}
            />
            <AutoWidthInput
              className="input"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={keyword}
              onChange={(e) => handleInputChange(e)}
              ref={inputRef}
              isText={true}
            />
            {isEmpty && <div className="search-annotation">Search</div>}
          </div>
        </div>
        <div className="searchStatus">
          {showSearchingSpinner && <Spinner fontSize="18px" />}
        </div>
        <div className="dropdown" ref={dropdownRef}>
          {showSpinner ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : showUsers ? (
            users.map((user) => {
              const isSelf = user.userId === userInfo.userId;
              const status = statusByUserId.get(user.userId)?.status;

              return isSelf ||
                status === 'connected' ||
                status === undefined ? (
                <User
                  key={user.userId}
                  currentUserId={userInfo.userId}
                  name={user.username}
                  userId={user.userId}
                  nonGroupTransferMenu={nonGroupTransferMenu}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSuggestedUserClick(user.userId, user.username);
                  }}
                />
              ) : (
                <ConnectableUserItem
                  key={user.userId}
                  name={user.username}
                  status={status}
                  isAcceptPending={
                    acceptConnectionRequest.isPending &&
                    acceptConnectionRequest.variables ===
                      statusByUserId.get(user.userId)?.connectionId
                  }
                  isRevokePending={
                    revokeConnectionRequest.isPending &&
                    revokeConnectionRequest.variables ===
                      statusByUserId.get(user.userId)?.connectionId
                  }
                  onSelect={(e) => {
                    e.stopPropagation();
                    handleSuggestedUserClick(user.userId, user.username);
                  }}
                  onRequest={(e) => {
                    e.stopPropagation();
                    setConnectTarget({
                      userId: user.userId,
                      username: user.username,
                    });
                  }}
                  onAccept={(e) => {
                    e.stopPropagation();
                    const connectionId = statusByUserId.get(
                      user.userId
                    )?.connectionId;
                    if (connectionId) {
                      acceptConnectionRequest.mutate(connectionId);
                    }
                  }}
                  onRevoke={(e) => {
                    e.stopPropagation();
                    const connectionId = statusByUserId.get(
                      user.userId
                    )?.connectionId;
                    if (connectionId) {
                      revokeConnectionRequest.mutate(connectionId);
                    }
                  }}
                />
              );
            })
          ) : (
            remainingSuggestedGroups.map((group) => (
              <UserItem
                key={group.id}
                name={group.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSuggestedGroupClick(group.id);
                }}
              />
            ))
          )}
        </div>
        {showUsers && (
          <Sentinel
            fetchPage={fetchNextPage}
            hasMore={hasNextPage}
            isFetchingPage={isFetchingNextPage}
          />
        )}
      </div>
      {connectTarget && (
        <ConnectRequestConfirm
          username={connectTarget.username}
          isLoading={sendConnectionRequest.isPending}
          onConfirm={() =>
            sendConnectionRequest.mutate(connectTarget.userId, {
              onSettled: () => setConnectTarget(null),
            })
          }
          onCancel={() => setConnectTarget(null)}
        />
      )}
    </StyledNonGroupTransferUsersMenu>
  );
}
