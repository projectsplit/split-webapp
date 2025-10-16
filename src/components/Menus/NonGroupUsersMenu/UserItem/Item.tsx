import { StyledItem } from "./Item.styled";
import { UserItemProps } from "../../../../interfaces";

export default function Item({
  name,
  onClick,
}: UserItemProps) {
  return (
    <StyledItem>
      <div className="top-row">
        <div onClick={onClick}>
          {name}</div>
      </div>
    </StyledItem>
  );
}
