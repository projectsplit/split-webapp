import { jsx as _jsx } from "react/jsx-runtime";
import { StyledItem } from './Item.styled';
import React from 'react';
export default React.memo(function Item({ name, onClick }) {
    return (_jsx(StyledItem, { children: _jsx("div", { className: "top-row", children: _jsx("div", { onClick: onClick, children: name }) }) }));
});
