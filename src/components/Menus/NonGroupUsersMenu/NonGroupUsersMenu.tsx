import { StyledNonGroupUsersMenu } from "./NonGroupUsersMenu.styled";
import { NonGroupUsersProps } from "../../../interfaces";
import { CategorySelector } from "../../CategorySelector/CategorySelector";
import { IoClose } from "react-icons/io5";
import { useSignal } from "@preact/signals-react";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../../MyButton/MyButton";
import Sentinel from "../../Sentinel";
import Input from "../../Input/Input";
import { useState } from "react";
import { useSearchUsersToInvite } from "../../../api/services/useSearchUsersToInvite";
import useDebounce from "../../../hooks/useDebounce";

export const NonGroupUsersMenu = ({ menu }: NonGroupUsersProps) => {
  const category = useSignal<string>("Friends");
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  const [debouncedKeyword, _isDebouncing] = useDebounce<string>(
    keyword.length > 1 ? keyword : "",
    500
  );

  const {
    //TODO this will be replaced by a friend list
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

  return (
    <StyledNonGroupUsersMenu>
      <div className="menu">
        <div className="header">
          <div className="closeButtonContainer">
            {" "}
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
        <div className="member-list"></div>
        <div className="spacer"></div>

        <div className="scrollable-content">
          <div className="input">
            <Input
              className="search-input"
              placeholder="Search"
              backgroundcolor="#2d2d2d"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword || ""}
            />
          </div>

          {/* {data?.pages.flatMap((x) =>
                      x.users.map((user) => (
                        <SearchResultItem
                          key={user.userId}
                          userId={user.userId}
                          username={user.username}
                          isAlreadyInvited={user.isAlreadyInvited}
                          isGroupMember={user.isGroupMember}
                          groupId={groupId}
                          guestId={guestToBeReplaced?.guestId}
                          guestName={guestToBeReplaced?.guestName}
                          onInviteSuccess={() => {
                            updateUserInvitationStatus(
                              user.userId,
                              !user.isAlreadyInvited
                            );
                          }}
                          userInvitationSent={userInvitationSent}
                        />
                      ))
                    )} */}
          <Sentinel
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
        {/* <MyButton fontSize="16" onClick={()=>menu.value=null}>
            Done
          </MyButton> */}
      </div>
    </StyledNonGroupUsersMenu>
  );
};
