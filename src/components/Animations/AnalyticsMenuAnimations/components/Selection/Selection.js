import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSelection } from './Selection.styled';
export default function Selection({ children, header }) {
    return (_jsxs(StyledSelection, { children: [_jsx("div", { className: "header", children: _jsx("strong", { children: header }) }), children] }));
}
