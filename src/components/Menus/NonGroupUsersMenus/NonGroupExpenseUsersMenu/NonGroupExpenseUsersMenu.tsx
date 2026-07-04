import { StyledNonGroupExpenseUsersMenu } from './NonGroupExpenseUsersMenu.styled';
import { NonGroupUsersProps } from '../../../../interfaces';
import { CategorySelector } from '../../../CategorySelector/CategorySelector';
import { useSignal } from '@preact/signals-react';
import { BiArrowBack } from 'react-icons/bi';
import MyButton from '../../../MyButton/MyButton';
import Sentinel from '../../../Sentinel';
import { useCallback, useMemo, useRef, useState } from 'react';
import AutoWidthInput from '../../../AutoWidthInput';
import { User, UserInfo } from '../../../../types';
import Item from '../Item/Item';
import React from 'react';
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

export const NonGroupExpenseUsersMenu = ({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  fromHomeGroup,
  isNonGroupExpense,
  fromNonGroup,
}: NonGroupUsersProps) => {
  const category = useSignal<string>('Users');
  const [keyword, setKeyword] = useState('');
  const pageSize = 10;
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : '',
    300
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const result = useSearchUsers(
    //TODO we need new endpoint to bring users (so we can do useSearchUsers)
    debouncedKeyword,
    pageSize
  );

  const searchedUserIds = (result.data?.pages.flatMap((x) => x.users) ?? [])
    .map((u) => u.userId)
    .filter((id) => id !== userInfo.userId);

  const { data: connectionStatuses } =
    useGetConnectionStatuses(searchedUserIds);

  const sendConnectionRequest = useSendConnectionRequest();
  const acceptConnectionRequest = useAcceptConnectionRequest();
  const [connectTarget, setConnectTarget] = useState<User | null>(null);

  const statusByUserId = useMemo(() => {
    const map = new Map(
      connectionStatuses?.statuses.map((s) => [s.userId, s]) ?? []
    );
    return map;
  }, [connectionStatuses]);

  if (!result) return null;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = result;

  const {
    data: userGroups,
    fetchNextPage: fetchNextGroupsPage,
    hasNextPage: hasNextGroupsPage,
    isFetchingNextPage: isFetchingNextGroupsPage,
  } = useSearchGroupsByName(debouncedKeyword, pageSize);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSelectedUserCick = (userId: string) => {
    nonGroupUsers.value = nonGroupUsers.value.filter(
      (x) => x.userId !== userId
    );
  };

  const handleSelectedGroupCick = () => {
    fromHomeGroup.value = null;
    groupMembers.value = [];
  };

  const addUser = (username: string) => {
    const trimmed = username.trim();
    const existingUser = data?.pages
      .flatMap((x) => x.users)
      .find((x) => x.username === trimmed);

    if (!existingUser) {
      // User not found in fetched data, keep keyword as-is or show error
      return;
    }

    const currentUser: User = {
      userId: userInfo.userId,
      username: userInfo.username,
    };

    if (
      !nonGroupUsers.value.map((x) => x.userId).includes(currentUser.userId)
    ) {
      nonGroupUsers.value = [...nonGroupUsers.value, currentUser];
    }

    const newUser: User = {
      userId: existingUser.userId,
      username: existingUser.username,
    };

    if (
      !nonGroupUsers.value.map((x) => x.username).includes(newUser.username)
    ) {
      nonGroupUsers.value = [...nonGroupUsers.value, newUser];
    }
    setKeyword('');
  };

  const handleSuggestedUserClick = useCallback(
    (username: string) => {
      fromHomeGroup.value = null;
      groupMembers.value = [];
      addUser(username);
      isNonGroupExpense.value = true;
    },
    [addUser]
  );

  const handleSuggestedGroupClick = useCallback(
    (groupId: string) => {
      nonGroupUsers.value = []; //TODO need to only allow current user in
      const existingGroup = userGroups?.pages
        .flatMap((x) => x.groups)
        .find((x) => x.id === groupId && !x.isArchived);

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
    },
    [userGroups]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  const remainingSuggestedUsers = useMemo(() => {
    return (
      data?.pages
        .flatMap((x) => x.users)
        .filter(
          (x) => !nonGroupUsers.value.some((u) => u.userId === x.userId)
        ) ?? []
    );
  }, [data, nonGroupUsers.value]);

  const allActiveGroups = useMemo(() => {
    return (
      userGroups?.pages
        .flatMap((x) => x.groups)
        .filter((x) => !x.isArchived) ?? []
    );
  }, [userGroups]);

  const remainingSuggestedGroups = useMemo(() => {
    return allActiveGroups.filter((x) => fromHomeGroup.value?.id !== x.id);
  }, [allActiveGroups, fromHomeGroup.value]);

  const isEmpty = useMemo(() => {
    return (
      (nonGroupUsers.value?.length === 0 ||
        nonGroupUsers.value?.length === 1) &&
      keyword.length === 0 &&
      !fromHomeGroup.value
    );
  }, [nonGroupUsers.value, fromHomeGroup.value, keyword]);

  const isPersonalFn = () => {
    if (nonGroupUsers.value.length > 0 || groupMembers.value.length > 0) {
      isPersonal.value = false;
    } else {
      isPersonal.value = true;
    }
  };

  return (
    <StyledNonGroupExpenseUsersMenu>
      <div className="fixedHeader">
        <div className="header">
          <div className="closeButtonContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => {
                if (!fromNonGroup) {
                  isPersonalFn();
                }
                menu.value = null;
              }}
            />
          </div>
          <div className="title">Split expense with you and...</div>
          <div className="gap"></div>
        </div>
        {!fromNonGroup && (
          <div className="categories">
            <CategorySelector
              activeCat={'Amounts'}
              categories={{
                cat1: 'Users',
                cat2: 'Groups',
              }}
              navLinkUse={false}
              activeCatAsState={category}
            />
          </div>
        )}
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
            <SelectedUsers
              users={nonGroupUsers.value}
              onRemove={handleSelectedUserCick}
              currentUserId={userInfo.userId}
            />
            {!fromNonGroup && (
              <SelectedGroup
                group={fromHomeGroup.value}
                onRemove={handleSelectedGroupCick}
              />
            )}

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

        {category.value === 'Users' ? (
          remainingSuggestedUsers.length > 0 && (
            <div className="dropdown" ref={dropdownRef}>
              {remainingSuggestedUsers.map((user) =>
                user.userId !== userInfo.userId ? (
                  <ConnectableUserItem
                    key={user.userId}
                    name={user.username}
                    status={statusByUserId.get(user.userId)?.status}
                    onSelect={(e) => {
                      e.stopPropagation();
                      handleSuggestedUserClick(user.username);
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
                  />
                ) : null
              )}
            </div>
          )
        ) : !fromNonGroup && remainingSuggestedGroups.length > 0 ? (
          <div className="dropdown" ref={dropdownRef}>
            {remainingSuggestedGroups.map((group) => (
              <Item
                key={group.id}
                name={group.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSuggestedGroupClick(group.id);
                  isNonGroupExpense.value = false;
                }}
              />
            ))}
          </div>
        ) : category.value === 'Groups' && !fromNonGroup ? (
          <div className="noData">
            <div className="msg">
              {allActiveGroups.length === 0
                ? 'You are currently not a member of any active group'
                : 'No other groups to select from'}
            </div>
            <MdOutlineGroupOff className="icon" />
          </div>
        ) : null}
        <Sentinel
          fetchPage={fetchNextPage}
          hasMore={hasNextPage}
          isFetchingPage={isFetchingNextPage}
        />
        {!fromNonGroup && (
          <Sentinel
            fetchPage={fetchNextGroupsPage}
            hasMore={hasNextGroupsPage}
            isFetchingPage={isFetchingNextGroupsPage}
          />
        )}
      </div>
      <div className="doneButton">
        <MyButton
          onClick={() => {
            if (!fromNonGroup) {
              isPersonalFn();
            }

            menu.value = null;
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
    </StyledNonGroupExpenseUsersMenu>
  );
};
