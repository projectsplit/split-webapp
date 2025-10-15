import { StyledUserItem } from "./UserItem.styled";
import { UserItemProps } from "../../../../interfaces";

export default function UserItem({
  username,
  onClick,
}: UserItemProps) {
  return (
    <StyledUserItem>
      <div className="top-row">
        <div onClick={onClick}>
          {username}</div>
      </div>
    </StyledUserItem>
  );
}
