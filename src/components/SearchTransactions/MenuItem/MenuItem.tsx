import { BeautifulMentionsMenuItemProps } from "lexical-beautiful-mentions";
import { StyledMenuItem } from "./MenuItem.styled";
import React from "react";
import labelColors from "../../../labelColors";

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ ...props }, ref) => {
  const { label, itemValue, memberId, item, ...restProps } = props;

  const bgColor = labelColors[item.data.color];
  return <StyledMenuItem ref={ref} {...restProps} $bgColor={bgColor}/>;
});
