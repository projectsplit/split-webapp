import { StyledUser } from "./User.styled";
import { UserProps } from "../../../../interfaces";
import { FaCheck } from "react-icons/fa";

export default function User({
  name,
  onClick,
  userId,
  nonGroupTransferMenu,
  currentUserId,
}: UserProps) {
  const selectedUserId =
    nonGroupTransferMenu.value.attribute === "sender"
      ? nonGroupTransferMenu.value.senderId
      : nonGroupTransferMenu.value.receiverId;
  return (
    <StyledUser $isSelected={userId === selectedUserId}>
      {" "}
      <div className="nameAndTick" onClick={onClick}>
        <div className="name">{userId === currentUserId ? "You" : name}</div>
        {userId === selectedUserId ? (
          <FaCheck className="tick" style={{ color: "#9e9e9e" }} />
        ) : null}
      </div>
    </StyledUser>
  );
}
