import { StyledNonGroupTransferUsersMenu } from './NonGroupTransferMenu.styled';
import { NonGroupTransferMenuProps } from '../../../../interfaces';
import { BiArrowBack } from 'react-icons/bi';
import MyButton from '../../../MyButton/MyButton';
import AutoWidthInput from '../../../AutoWidthInput';
import Sentinel from '../../../Sentinel';
import { useCallback, useMemo, useRef, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { useOutletContext } from 'react-router-dom';
import { UserInfo } from '../../../../types';
import User from '../User/User';
import { useSearchGroupsByName } from '../../../../api/auth/QueryHooks/useSearchGroupsByName';
import Item from '../Item/Item';
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
  isNonGroupTransfer,
}: NonGroupTransferMenuProps) {
  const pageSize = 10;
  const [keyword, setKeyword] = useState<string>('');
  // const [selectedUser, setSelectedUser] = useState<string>('')
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

    if (isSelf) {
      if (isSenderMode) {
        nonGroupTransferMenu.value = {
          ...menu,
          receiverId: userInfo.userId,
          receiverName: 'You',

          senderId: menu.senderId,
          senderName: menu.senderName,
        };
      } else {
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
    } else {
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
    },
    [userGroups]
  );

  const handleSelectedGroupCick = () => {
    fromHomeGroup.value = null;
    groupMembers.value = [];
    isNonGroupTransfer.value = true;
  };

  const isPickingUser =
    nonGroupTransferMenu.value.attribute === 'sender' ||
    nonGroupTransferMenu.value.attribute === 'receiver';
  const showUsers = isPickingUser && users.length > 0;

  // useDebounce reports itself busy for its first 300ms even on mount, when the value never
  // changed — without the length gate that blinks a spinner over cached results on every open.
  const isTypingKeyword = isDebouncing && keyword.length > 1;

  // The spinner only stands in for an empty list. Showing it for every fetch swapped the loaded
  // names out while the next page was in flight, which also pulled the sentinel back into view and
  // made it request yet another page — two spinners at once and a list that kept blanking.
  const showSpinner = showUsers
    ? false
    : isPickingUser
      ? usersAreLoading || isTypingKeyword
      : groupsAreLoading;

  // Results for the previous keyword stay up while the new ones are on their way, so the typing
  // needs its own spinner above them — otherwise a search reads as having done nothing at all.
  const showSearchingSpinner =
    isPickingUser && showUsers && (isTypingKeyword || usersAreStale);

  return (
    <StyledNonGroupTransferUsersMenu>
      <div className="fixedHeader">
        <div className="header">
          <div className="closeButtonContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => {
                nonGroupTransferMenu.value = {
                  ...nonGroupTransferMenu.value,
                  menu: null,
                };
              }}
            />
          </div>
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
            // onBlur={handleBlur}
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

              // Yourself is always a valid side of a transfer, and anyone connected keeps the
              // normal row with its selected tick. Everyone else gets the request row instead.
              // An unknown status keeps the normal row too, so a slow or failed statuses call
              // leaves the picker working rather than showing rows that do nothing.
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
              <Item
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
      <div className="doneButton">
        <MyButton
          onClick={() => {
            nonGroupTransferMenu.value = {
              ...nonGroupTransferMenu.value,
              menu: null,
            };
          }}
        >
          Done
        </MyButton>
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
