import { BeautifulMentionsMenuItemProps } from "lexical-beautiful-mentions";
import { StyledMenuItem } from "./MenuItem.styled";
import React from "react";
import labelColors from "../../../labelColors";
import { MdGroup } from "react-icons/md";

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ label, item, selected, ...restProps }, ref) => {
  const { color } = item?.data || {};
  const itemvalue = item?.value;
  const bgColor = labelColors[color] || "#ffffff";
  const isPersonal = item?.isPersonal || item?.data?.isPersonal;
  return (
    <StyledMenuItem
      ref={ref}
      {...restProps}
      $bgColor={bgColor}
      $selected={selected}
    >
      <div className="childrenAndTitle">
        <div className="children" style={{ color: "black" }}>{isPersonal && !item?.data.id.includes("_") && <MdGroup style={{ marginRight: "4px" }} />}</div>
        <div className="title">{item?.data.$isUser ? "You" : itemvalue}</div>
      </div>

    </StyledMenuItem>
  );
});


// isPersonal && !label.id.includes("_") && <MdGroup style={{ marginRight: "4px" }}