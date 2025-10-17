import React from "react";
import { SearchUserToInviteResponseItem } from "../../../../types";
import { BsFillPersonFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export const SelectedUsers = React.memo(
  ({
    users,
    onRemove,
  }: {
    users: SearchUserToInviteResponseItem[];
    onRemove: (id: string) => void;
  }) => {
    return users.map((user) => (
      <span
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
      </span>
    ));
  }
);
