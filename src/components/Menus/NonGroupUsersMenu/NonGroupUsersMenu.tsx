import { StyledNonGroupUsersMenu } from "./NonGroupUsersMenu.styled";
import { NonGroupUsersProps } from "../../../interfaces";
import { CategorySelector } from "../../CategorySelector/CategorySelector";
import { IoClose } from "react-icons/io5";
import { Signal, useSignal } from "@preact/signals-react";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../MyButton/MyButton";
import Sentinel from "../../Sentinel";
import { useRef, useState } from "react";
import { useSearchUsersToInvite } from "../../../api/services/useSearchUsersToInvite";
import useDebounce from "../../../hooks/useDebounce";
import AutoWidthInput from "../../AutoWidthInput";
import {
  GetGroupsResponseItem,
  SearchUserToInviteResponseItem,
  UserInfo,
} from "../../../types";
import useGetGroups from "../../../api/services/useGetGroup";
import { useOutletContext } from "react-router-dom";
import Item from "./UserItem/Item";
import { TiGroup } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";

export const NonGroupUsersMenu = ({ menu }: NonGroupUsersProps) => {
  const category = useSignal<string>("Friends");
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<SearchUserToInviteResponseItem[]>([]);
  const [groups, setGroups] = useState<GetGroupsResponseItem[]>([]);
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
    "a865c378-8956-4cb7-903d-a669e26282de",
    debouncedKeyword,
    pageSize
  );

  const {
    data: userGroups,
    fetchNextPage: fetchNextGroupsPage,
    hasNextPage: hasNextGroupsPage,
    isFetchingNextPage: isFetchingNextGroupsPage,
  } = useGetGroups(userInfo.userId, pageSize);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSelectedUserCick = (userId: string) => {
    setUsers(users.filter((x) => x.userId !== userId));
  };
  const handleSelectedGroupCick = (groupId: string) => {
    setGroups(groups.filter((x) => x.id !== groupId));
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

    const newUser: SearchUserToInviteResponseItem = {
      //TODO will have to change to friend list rather than users to invite
      userId: existingUser.userId,
      username: existingUser.username,
      isGroupMember: existingUser.isGroupMember,
      isAlreadyInvited: existingUser.isAlreadyInvited,
    };

    if (!users.map((x) => x.username).includes(newUser.username)) {
      setUsers([...users, newUser]);
    }
    setKeyword("");
  };

  // const addGroup = (groupname: string) => {
  //   const trimmed = groupname.trim();
  //   const existingGroup = userGroups?.pages
  //     .flatMap((x) => x.groups)
  //     .find((x) => x.name === trimmed);

  //   if (!existingGroup) {
  //     // User not found in fetched data, keep keyword as-is or show error
  //     return;
  //   }

  //   const newGroup: GetGroupsResponseItem = {
  //     //TODO will have to change to group list with members
  //     id: existingGroup.id,
  //     name: existingGroup.name,
  //   };

  //   if (!groups.map((x) => x.name).includes(newGroup.name)) {
  //     setGroups([...groups, newGroup]);
  //   }
  //   setKeyword("");
  // };

  const handleSuggestedUserClick = (username: string) => {
    addUser(username);
    // inputRef.current?.focus();
  };

const handleSuggestedGroupClick = (groupId: string) => {
  const existingGroup = userGroups?.pages
    .flatMap((x) => x.groups)
    .find((x) => x.id === groupId);

  if (!existingGroup) return;

  setGroups([
    {
      id: existingGroup.id,
      name: existingGroup.name,
    },
  ]);

  // Refocus input
  // inputRef.current?.focus();
};


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    // category: Signal<string>
  ) => {
    const newKeyword = e.target.value;
    // const trimmed = newKeyword.trim();

    // if (trimmed.length === 0) {
    //   setKeyword("");
    //   return;
    // }

    // if (newKeyword.slice(-1) === " " && category.value === "Friends") {
    //   addUser(newKeyword);

    //   return;
    // } else if (newKeyword.slice(-1) === " " && category.value === "Groups") {
    //   addGroup(newKeyword);

    //   return;
    // }

    setKeyword(newKeyword);
  };

  const remainingSuggestedUsers =
    data?.pages
      .flatMap((x) => x.users)
      .filter((x) => !users.map((u) => u.userId).includes(x.userId)) ?? [];

  const remainingSuggestedGroups =
    userGroups?.pages
      .flatMap((x) => x.groups)
      .filter((x) => !groups.map((g) => g.id).includes(x.id)) ?? [];

  const isEmpty =
    users?.length === 0 && keyword.length === 0 && groups?.length === 0;

  return (
    <StyledNonGroupUsersMenu>
      <div className="fixedHeader">
        <div className="header">
          <div className="closeButtonContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => (menu.value = null)}
            />
          </div>
          <div className="title">Shared with you and...</div>
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
            {users.map((user) => (
              <span
                key={user.userId}
                style={{
                  backgroundColor: "white",
                  color: "#000000c8",
                }}
                onClick={() => handleSelectedUserCick(user.userId)}
                className="selected-label"
              >
                <div className="info">
                  {" "}
                  <BsFillPersonFill />
                  {user.username}
                </div>

                <IoClose />
              </span>
            ))}
            {groups.map((group) => (
              <span
                key={group.id}
                style={{
                  backgroundColor: "#696e80",
                  color: "white",
                }}
                onClick={() => handleSelectedGroupCick(group.id)}
                className="selected-label"
              >
                <div className="info">
                  <TiGroup />
                  All of : {group.name}
                </div>

                <IoClose />
              </span>
            ))}
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
                {remainingSuggestedUsers.map((user) => (
                  <Item
                    key={user.userId}
                    name={user.username}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSuggestedUserClick(user.username);
                    }}
                  />
                ))}
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
        <MyButton>Done</MyButton>
      </div>
    </StyledNonGroupUsersMenu>
  );
};
