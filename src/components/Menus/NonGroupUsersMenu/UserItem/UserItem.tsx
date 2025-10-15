import React from "react";
import MyButton from "../../../MyButton/MyButton";
import { StyledUserItem } from "./UserItem.styled";
import { UserItemProps } from "../../../../interfaces";

export default function UserItem({
  username,

  onClick,
}: UserItemProps) {
  return (
    <StyledUserItem>
      <div className="top-row">
        <div>{username}</div>
        <MyButton

          variant={"primary"}
          onClick={onClick}
        >
          Add
        </MyButton>
      </div>
    </StyledUserItem>
  );
}
