import { StyledNonGroupUsersMenu } from "./NonGroupUsersMenu.styled";
import { NonGroupUsersProps } from "../../../interfaces";
import { CategorySelector } from "../../CategorySelector/CategorySelector";
import { IoClose } from "react-icons/io5";
import { useSignal } from "@preact/signals-react";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../MyButton/MyButton";
import Sentinel from "../../Sentinel";
import Input from "../../Input/Input";
import { useRef, useState } from "react";
import { useSearchUsersToInvite } from "../../../api/services/useSearchUsersToInvite";
import useDebounce from "../../../hooks/useDebounce";
import UserItem from "./UserItem/UserItem";
import AutoWidthInput from "../../AutoWidthInput";
import { SearchUserToInviteResponseItem } from "../../../types";
import { text } from "stream/consumers";

export const NonGroupUsersMenu = ({ menu }: NonGroupUsersProps) => {
  const category = useSignal<string>("Friends");
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<SearchUserToInviteResponseItem[]>([]);
  const pageSize = 10;
  const [debouncedKeyword, _isDebouncing] = useDebounce<string>(
    keyword.length > 1 ? keyword : "",
    500
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSelectedUserCick = (userId: string) => {
    setUsers(users.filter((x) => x.userId !== userId));
  };

  const addUser = (username: string) => {
    if (users.map(x => x.username).includes(username)) {
      setKeyword("");
      return;
    }

    const existingUser = data?.pages
      .flatMap(x => x.users)
      .find(x => x.username === username);

    const newUser: SearchUserToInviteResponseItem = existingUser||{
      userId: username,
      username,
      isGroupMember: false,
      isAlreadyInvited: false,
    };

    if (!users.map((x) => x.username).includes(newUser.username)) {
      setUsers([...users, newUser]);
    }
    setKeyword("");
  };

  const handleSuggestedUserClick = (username: string) => {
    addUser(username);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    const trimmed = newKeyword.trim();

    if (trimmed.length === 0) {
      setKeyword("");
      return;
    }

    if (newKeyword.slice(-1) === " ") {
      addUser(trimmed);
      return;
    }

    setKeyword(trimmed);
  };

  const remainingSuggestedUsers =
    data?.pages
      .flatMap((x) => x.users)
      .filter((x) => !users.map((u) => u.userId).includes(x.userId)) ?? [];

  const isEmpty = users?.length === 0 && keyword.length === 0;



  return (
    <StyledNonGroupUsersMenu>
      <div className="menu">
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
                  {user.username}
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
                onChange={handleInputChange}
                ref={inputRef}
                isText={true}
                autoFocus
              />
              {isEmpty && <div className="search-annotation">Search</div>}
            </div>
          </div>

          {remainingSuggestedUsers.length > 0 && (
            <div className="dropdown" ref={dropdownRef}>
              {remainingSuggestedUsers.map((user) => (
            
                  <UserItem
                    username={user.username}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSuggestedUserClick(user.username);
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
        </div>
      </div>
    </StyledNonGroupUsersMenu>
  );
};
