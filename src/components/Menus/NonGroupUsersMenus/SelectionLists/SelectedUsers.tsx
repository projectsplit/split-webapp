import React from "react";
import { User } from "../../../../types";
import { BsFillPersonFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { styled } from "styled-components";

export const SelectedUsers = React.memo(
  ({
    users,
    onRemove,
    currentUserId,
  }: {
    users: User[];
    onRemove: (id: string) => void;
    currentUserId: string;
  }) => {
    return users.map((user) =>
      user.userId !== currentUserId ? (
        <StyledSelectedUser
          key={user.userId}
          style={{
            backgroundColor: "white",
            color: "#000000c8",
          }}
          onClick={() => onRemove(user.userId)}
          className="selected-label"
        >
          <div className="info">
            {" "}
            <BsFillPersonFill />
            {user.username}
          </div>

          <IoClose />
        </StyledSelectedUser>
      ) : null
    );
  }
);

const StyledSelectedUser = styled.span`
  color: #000000a2;
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  margin-bottom:5px;
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;