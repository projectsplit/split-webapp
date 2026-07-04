import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTree } from './Tree.styled';
export default function Tree({ items }) {
    return (_jsx(StyledTree, { children: _jsx("ul", { children: items.map((item, index) => (_jsx("li", { children: item }, index))) }) }));
}
