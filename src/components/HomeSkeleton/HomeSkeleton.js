import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledHomeSkeleton } from './HomeSkeleton.styled';
export const HomeSkeleton = () => {
    return (_jsxs(StyledHomeSkeleton, { children: [_jsxs("div", { className: "welcomeShimmer", children: [_jsx("div", { className: "boneLine", style: { width: 75, height: 15, borderRadius: 4 } }), _jsx("div", { className: "boneLine", style: { width: 90, height: 15, borderRadius: 4 } })] }), _jsxs("div", { className: "menuShimmer", children: [_jsx("div", { className: "bone" }), _jsx("div", { className: "bone" }), _jsx("div", { className: "bone" }), _jsx("div", { className: "bone" })] }), _jsx("div", { className: "fabShimmer" })] }));
};
