import { StyledNonGroupUsersMenu } from "./NonGroupUsersMenu.styled";
import { NonGroupUsersProps } from "../../../interfaces";
import { CategorySelector } from "../../CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../MyButton/MyButton";
import Sentinel from "../../Sentinel";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchUsersToInvite } from "../../../api/services/useSearchUsersToInvite";
import useDebounce from "../../../hooks/useDebounce";
import AutoWidthInput from "../../AutoWidthInput";
import { SearchUserToInviteResponseItem, User, UserInfo } from "../../../types";
import Item from "./Item/Item";
import React from "react";
import { SelectedGroups } from "./SelectionLists/SelectedGroups";
import { SelectedUsers } from "./SelectionLists/SelectedUsers";
import { useSearchGroupsByName } from "../../../api/services/useSearchGroupsByName";
import { useOutletContext } from "react-router-dom";

export const NonGroupUsersMenu = ({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  nonGroupGroups,
}: NonGroupUsersProps) => {
  const category = useSignal<string>("Friends");
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  const [debouncedKeyword, _isDebouncing] = useDebounce<string>(
    keyword.length > 1 ? keyword : "",
    500
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    updateUserInvitationStatus,
  } = useSearchUsersToInvite(
    "f7637b50-e77d-4609-9e38-eb0acc9c9c51",
    debouncedKeyword,
    pageSize
  );

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
  const handleSelectedGroupCick = (groupId: string) => {
    nonGroupGroups.value = nonGroupGroups.value.filter((x) => x.id !== groupId);
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

    const newUser: SearchUserToInviteResponseItem = {
      //TODO will have to change to friend list rather than users to invite
      userId: existingUser.userId,
      username: existingUser.username,
      isGroupMember: existingUser.isGroupMember,
      isAlreadyInvited: existingUser.isAlreadyInvited,
    };

    if (
      !nonGroupUsers.value.map((x) => x.username).includes(newUser.username)
    ) {
      nonGroupUsers.value = [...nonGroupUsers.value, newUser];
    }
    setKeyword("");
  };

  const handleSuggestedUserClick = useCallback(
    (username: string) => {
      nonGroupGroups.value = [];
      groupMembers.value = [];

      addUser(username);
    },
    [addUser]
  );

  const handleSuggestedGroupClick = useCallback(
    (groupId: string) => {
      nonGroupUsers.value = []; //TODO need to only allow current user in
      const existingGroup = userGroups?.pages
        .flatMap((x) => x.groups)
        .find((x) => x.id === groupId);

      if (!existingGroup) return;
      nonGroupGroups.value = [
        {
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
        },
      ];
      groupMembers.value = [...existingGroup.members, ...existingGroup.guests];
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

  const remainingSuggestedGroups = useMemo(() => {
    return (
      userGroups?.pages
        .flatMap((x) => x.groups)
        .filter((x) => !nonGroupGroups.value.some((g) => g.id === x.id)) ?? []
    );
  }, [userGroups, nonGroupGroups.value]);

  const isEmpty = useMemo(
    () =>
      nonGroupUsers.value?.length === 0 &&
      keyword.length === 0 &&
      nonGroupGroups.value?.length === 0,
    [nonGroupUsers.value, nonGroupGroups.value, keyword]
  );

  const isPersonalFn = () => {
    if (nonGroupUsers.value.length > 0 || groupMembers.value.length > 0) {
      isPersonal.value = false;
    } else {
      isPersonal.value = true;
    }
  };

  return (
    <StyledNonGroupUsersMenu>
      <div className="fixedHeader">
        <div className="header">
          <div className="closeButtonContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => {
                isPersonalFn();
                menu.value = null;
              }}
            />
          </div>
          <div className="title">Share expense with</div>
          <div className="gap"></div>
        </div>
        <div className="categories">
          <CategorySelector
            activeCat={"Amounts"}
            categories={{
              cat1: "Friends",
              cat2: "Groups",
            }}
            navLinkUse={false}
            activeCatAsState={category}
          />
        </div>
      </div>
      <div className="scrollable-content">
        <div className="input">
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
            <SelectedGroups
              groups={nonGroupGroups.value}
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

        {category.value === "Friends"
          ? remainingSuggestedUsers.length > 0 && (
              <div className="dropdown" ref={dropdownRef}>
                {remainingSuggestedUsers.map((user) =>
                  user.userId !== userInfo.userId ? (
                    <Item
                      key={user.userId}
                      name={user.username}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSuggestedUserClick(user.username);
                      }}
                    />
                  ) : null
                )}
              </div>
            )
          : remainingSuggestedGroups.length > 0 && (
              <div className="dropdown" ref={dropdownRef}>
                {remainingSuggestedGroups.map((group) => (
                  <Item
                    key={group.id}
                    name={group.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSuggestedGroupClick(group.id);
                    }}
                  />
                ))}
              </div>
            )}

        <Sentinel
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <Sentinel
          fetchNextPage={fetchNextGroupsPage}
          hasNextPage={hasNextGroupsPage}
          isFetchingNextPage={isFetchingNextGroupsPage}
        />
      </div>
      <div className="doneButton">
        <MyButton
          onClick={() => {
            isPersonalFn();
            menu.value = null;
          }}
        >
          Done
        </MyButton>
      </div>
    </StyledNonGroupUsersMenu>
  );
};
