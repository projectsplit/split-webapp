import { StyledNonGroupExpenseUsersMenu } from "./NonGroupExpenseUsersMenu.styled";
import { NonGroupUsersProps } from "../../../../interfaces";
import { CategorySelector } from "../../../CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../../MyButton/MyButton";
import Sentinel from "../../../Sentinel";
import { useCallback, useMemo, useRef, useState } from "react";
import AutoWidthInput from "../../../AutoWidthInput";
import {
  User,
  UserInfo,
} from "../../../../types";
import Item from "../Item/Item";
import React from "react";
import { SelectedUsers } from "../SelectionLists/SelectedUsers";
import { useSearchGroupsByName } from "../../../../api/auth/QueryHooks/useSearchGroupsByName";
import { useOutletContext } from "react-router-dom";
import useDebounce from "../../../../hooks/useDebounce";
import { SelectedGroup } from "../SelectionLists/SelectedGroup";
import { useSearchUsers } from "@/api/auth/QueryHooks/useSearchUsers";
import { MdOutlineGroupOff } from "react-icons/md";

export const NonGroupExpenseUsersMenu = ({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  nonGroupGroup,
  isNonGroupExpense,
  fromNonGroup
}: NonGroupUsersProps) => {

  const category = useSignal<string>("Users");
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  const [debouncedKeyword] = useDebounce(
    keyword.length > 1 ? keyword : "",
    300
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const result = useSearchUsers( //TODO we need new endpoint to bring users (so we can do useSearchUsers)
    debouncedKeyword,
    pageSize
  )

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
    nonGroupGroup.value = null;
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
    setKeyword("");
  };

  const handleSuggestedUserClick = useCallback(
    (username: string) => {
      nonGroupGroup.value = null;
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
        .find((x) => x.id === groupId);

      if (!existingGroup) return;
      (nonGroupGroup.value = {
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
        ]);
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
        .filter((x) => nonGroupGroup.value?.id !== x.id) ?? []
    );
  }, [userGroups, nonGroupGroup.value]);

  const isEmpty = useMemo(() => {
    return (nonGroupUsers.value?.length === 0 || nonGroupUsers.value?.length === 1) &&
      keyword.length === 0 &&
      !nonGroupGroup.value;
  }, [nonGroupUsers.value, nonGroupGroup.value, keyword]);

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
          <div className="title">Share expense with you and...</div>
          <div className="gap"></div>
        </div>
        {!fromNonGroup && <div className="categories">
          <CategorySelector
            activeCat={"Amounts"}
            categories={{
              cat1: "Users",
              cat2: "Groups",
            }}
            navLinkUse={false}
            activeCatAsState={category}
          />
        </div>}
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
            {!fromNonGroup && <SelectedGroup
              group={nonGroupGroup.value}
              onRemove={handleSelectedGroupCick}
            />}

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

        {category.value === "Users"
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
          : !fromNonGroup && remainingSuggestedGroups.length > 0 ? (
            <div className="dropdown" ref={dropdownRef}>
              {remainingSuggestedGroups.map((group) => (
                <Item
                  key={group.id}
                  name={group.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSuggestedGroupClick(group.id);
                    isNonGroupExpense.value = false
                  }}
                />
              ))}
            </div>
          ) : <div className="noData">
            <div className="msg">You are currently not a member of any group </div>
            <MdOutlineGroupOff className="icon" />
          </div>}
        <Sentinel
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        {!fromNonGroup && <Sentinel
          fetchNextPage={fetchNextGroupsPage}
          hasNextPage={hasNextGroupsPage}
          isFetchingNextPage={isFetchingNextGroupsPage}
        />}
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
    </StyledNonGroupExpenseUsersMenu>
  );
};
