import React from "react";
import { Group } from "../../../../types";
import { TiGroup } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

export const SelectedGroup = React.memo(
  ({
    group,
    onRemove,
  }: {
    group: Group | null;
    onRemove: () => void;
  }) => {
    if (!group) return null;

    return (
      <span
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
      </span>
    );
  }
);
