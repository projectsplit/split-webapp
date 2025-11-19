import { StyledItem } from "./Item.styled";
import { UserItemProps } from "../../../../interfaces";
import React from "react";

export default React.memo(function Item({
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
})
