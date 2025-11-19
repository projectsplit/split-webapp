import { StyledNonGroupTransferUsersMenu } from "./NonGroupTransferUsersMenu.styled";
import { NonGroupTransferUsersMenuProps } from "../../../../interfaces";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../../MyButton/MyButton";
import AutoWidthInput from "../../../AutoWidthInput";
import Sentinel from "../../../Sentinel";
import { useCallback, useRef, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useSearchFriendsToInvite } from "../../../../api/services/useSearchFriendsToInvite";
import { useOutletContext } from "react-router-dom";
import { UserInfo } from "../../../../types";
import User from "../User/User";
import ShimmerUserRow from "../../../ShimmersUserRow/ShimmerUserRow";

export default function NonGroupTransferUsersMenu({
  nonGroupTransferMenu,
}: NonGroupTransferUsersMenuProps) {
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

    nonGroupTransferMenu.value = {
      ...nonGroupTransferMenu.value,
      ...(nonGroupTransferMenu.value.attribute === "sender"
        ? { senderId: userId, senderName: displayName }
        : { receiverId: userId, receiverName: displayName }),
    };
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
  const isEmpty = keyword.length === 0;

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
              : "Select receiver"}
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
          {isFetching ? (
            <>
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <ShimmerUserRow key={i} />
                ))}
            </>
          ) : users.length > 0 ? (
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
          ) : null}
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
