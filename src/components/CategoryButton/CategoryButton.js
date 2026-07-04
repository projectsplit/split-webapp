import { jsx as _jsx } from "react/jsx-runtime";
import { StyledCategoryButton } from './CategoryButton.styled';
import { NavLink } from 'react-router-dom';
import { forwardRef } from 'react';
export const CategoryButton = forwardRef(({ children, to, selected, onClick, backgroundcoloronselect, style }, ref) => {
    return (_jsx(StyledCategoryButton, { backgroundcoloronselect: backgroundcoloronselect, style: style, ref: ref, children: to ? (_jsx(NavLink, { to: to, replace: true, className: ({ isActive }) => isActive || selected ? 'active' : 'inactive', onClick: onClick, children: children })) : (_jsx("div", { className: selected ? 'active' : 'inactive', onClick: onClick, children: children })) }));
});
