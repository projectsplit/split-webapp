import { StyledNonGroupTransferUsersMenu } from "./NonGroupTransferMenu.styled";
import { NonGroupTransferMenuProps } from "../../../../interfaces";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../../MyButton/MyButton";
import AutoWidthInput from "../../../AutoWidthInput";
import Sentinel from "../../../Sentinel";
import { useCallback, useMemo, useRef, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useSearchFriendsToInvite } from "../../../../api/services/useSearchFriendsToInvite";
import { useOutletContext } from "react-router-dom";
import { UserInfo } from "../../../../types";
import User from "../User/User";
import { useSearchGroupsByName } from "../../../../api/services/useSearchGroupsByName";
import Item from "../Item/Item";
import { SelectedGroup } from "../SelectionLists/SelectedGroup";
import Spinner from "../../../Spinner/Spinner";

export default function NonGroupTransferMenu({
  nonGroupTransferMenu,
  nonGroupGroup,
  groupMembers,
  isNonGroupTransfer,
}: NonGroupTransferMenuProps) {
  const pageSize = 10;
  const [keyword, setKeyword] = useState<string>("");
  // const [selectedUser, setSelectedUser] = useState<string>('')
  const [debouncedKeyword, isDebouncing] = useDebounce(
    keyword.length > 1 ? keyword : "",
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
    const displayName = username === userInfo.username ? "You" : username;
    const isSelf = userId === userInfo.userId;

    const menu = nonGroupTransferMenu.value;
    const isSenderMode = menu.attribute === "sender";

    if (isSelf) {
      if (isSenderMode) {
        nonGroupTransferMenu.value = {
          ...menu,
          receiverId: userInfo.userId,
          receiverName: "You",

          senderId: menu.receiverId || menu.senderId,
          senderName: menu.receiverId ? menu.receiverName : menu.senderName,
        };
      } else {
        nonGroupTransferMenu.value = {
          ...menu,
          senderId: userInfo.userId,
          senderName: "You",

          receiverId: menu.senderId || menu.receiverId,
          receiverName: menu.senderId ? menu.senderName : menu.receiverName,
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
        receiverName: "You",
      };
    } else {
      nonGroupTransferMenu.value = {
        ...menu,
        receiverId: userId,
        receiverName: displayName,
        senderId: userInfo.userId,
        senderName: "You",
      };
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const result = useSearchFriendsToInvite(
    "f7637b50-e77d-4609-9e38-eb0acc9c9c51",
    debouncedKeyword,
    pageSize,
    true
  );

  if (!result) return null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    result;
  const users = data?.pages.flatMap((x) => x.users) ?? [];

  const { data: userGroups, isFetching: groupsAreFetching } =
    useSearchGroupsByName(debouncedKeyword, pageSize);

  const remainingSuggestedGroups = useMemo(() => {
    return (
      userGroups?.pages
        .flatMap((x) => x.groups)
        .filter((x) => nonGroupGroup.value?.id !== x.id) ?? []
    );
  }, [userGroups, nonGroupGroup.value]);

  const isEmpty = useMemo(
    () => keyword.length === 0 && !nonGroupGroup.value,
    [nonGroupGroup.value, keyword]
  );

  const handleSuggestedGroupClick = useCallback(
    (groupId: string) => {
      const existingGroup = userGroups?.pages
        .flatMap((x) => x.groups)
        .find((x) => x.id === groupId);

      if (!existingGroup) return;
      isNonGroupTransfer.value = false;
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

  const handleSelectedGroupCick = () => {
    nonGroupGroup.value = null;
    groupMembers.value = [];
    isNonGroupTransfer.value = true;
  };

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
            {nonGroupTransferMenu.value.attribute === "sender"
              ? "Select sender"
              : nonGroupTransferMenu.value.attribute === "receiver"
              ? "Select receiver"
              : "Select Group"}
          </div>
          <div className="gap"></div>
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
            <SelectedGroup
              group={nonGroupGroup.value}
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
        <div className="dropdown" ref={dropdownRef}>
          {isFetching || groupsAreFetching ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : users.length > 0 &&
            (nonGroupTransferMenu.value.attribute === "sender" ||
              nonGroupTransferMenu.value.attribute === "receiver") ? (
            users.map((user) => (
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
            ))
          ) : (
            remainingSuggestedGroups.length > 0 && (
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
            )
          )}
        </div>
        <Sentinel
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
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
    </StyledNonGroupTransferUsersMenu>
  );
}
