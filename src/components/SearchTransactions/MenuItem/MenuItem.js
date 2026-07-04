import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledMenuItem } from './MenuItem.styled';
import React from 'react';
import labelColors from '../../../labelColors';
import { MdGroup } from 'react-icons/md';
export const MenuItem = React.forwardRef(({ label, item, selected, ...restProps }, ref) => {
    const { color } = item?.data || {};
    const itemvalue = item?.value;
    const bgColor = labelColors[color] || '#ffffff';
    const isPersonal = item?.isPersonal || item?.data?.isPersonal;
    return (_jsx(StyledMenuItem, { ref: ref, ...restProps, "$bgColor": bgColor, "$selected": selected, children: _jsxs("div", { className: "childrenAndTitle", children: [_jsx("div", { className: "children", style: { color: 'black' }, children: isPersonal && !item?.data.id.includes('_') && (_jsx(MdGroup, { style: { marginRight: '4px' } })) }), _jsx("div", { className: "title", children: item?.data.$isUser ? 'You' : itemvalue })] }) }));
});
