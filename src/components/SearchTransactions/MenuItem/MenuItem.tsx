import { BeautifulMentionsMenuItemProps } from "lexical-beautiful-mentions";
import { StyledMenuItem } from "./MenuItem.styled";
import React from "react";
import labelColors from "../../../labelColors";

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ label, item, ...restProps }, ref) => {
  const { color } = item?.data || {};
  const itemValue = item?.value;
  const bgColor = labelColors[color] || "#ffffff";

  return (
    <StyledMenuItem ref={ref} {...restProps} $bgColor={bgColor}>
      {itemValue}
    </StyledMenuItem>
  );
});
