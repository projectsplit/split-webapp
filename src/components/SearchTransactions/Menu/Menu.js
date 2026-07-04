import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { ScrollableContainer } from './ScrollableContainer.styled';
import { StyledMenu } from './Menu.styled';
export const Menu = React.forwardRef(({ open, contentEditableHeight, loading, ...other }, ref) => {
    return (_jsx(ScrollableContainer, { "$contentEditableHeight": contentEditableHeight, children: _jsx("div", { className: "items", children: _jsx(StyledMenu, { ref: ref, "$contentEditableHeight": contentEditableHeight, ...other }) }) }));
});
