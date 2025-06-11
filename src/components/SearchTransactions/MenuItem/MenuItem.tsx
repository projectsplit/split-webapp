import { BeautifulMentionsMenuItemProps } from "lexical-beautiful-mentions";
import { StyledMenuItem } from "./MenuItem.styled";
import React from "react";

export const MenuItem = React.forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ ...props }, ref) => {
  const { label, itemValue,memberId,item, ...restProps } = props;
  return <StyledMenuItem ref={ref} {...restProps} />;
});