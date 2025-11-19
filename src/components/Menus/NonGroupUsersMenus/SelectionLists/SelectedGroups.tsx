import React from "react";
import { GetGroupsResponseItem } from "../../../../types";
import { TiGroup } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

export const SelectedGroups = React.memo(
  ({
    groups,
    onRemove,
  }: {
    groups: GetGroupsResponseItem[];
    onRemove: (id: string) => void;
  }) => {
    return groups.map((group) => (
      <span
        key={group.id}
        style={{
          backgroundColor: "#696e80",
          color: "white",
        }}
        onClick={() => onRemove(group.id)}
        className="selected-label"
      >
        <div className="info">
          <TiGroup />
          {group.name}
        </div>

        <IoClose />
      </span>
    ));
  }
);