import React from "react";
import { Group } from "../../../../types";
import { TiGroup } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

export const SelectedGroup = React.memo(
  ({ group, onRemove }: { group: Group | null; onRemove: () => void }) => {
    if (!group) return null;

    return (
      <StyledSelectedGroup
        key={group.id}
        className="selected-label"
        style={{ backgroundColor: "#696e80", color: "white" }}
        onClick={onRemove}
      >
        <div className="info">
          <TiGroup />
          {group.name}
        </div>

        <IoClose />
      </StyledSelectedGroup>
    );
  }
);

const StyledSelectedGroup = styled.span`
  color: #000000a2;
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;
