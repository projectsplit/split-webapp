import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { StyledFiltersAndBarsSkeleton } from './FiltersAndBarsSkeleton.styled';
import { Mode } from '@/types';
export const FiltersAndBarsSkeleton = ({ mode, }) => {
    const showGroupBars = mode !== Mode.Personal;
    return (_jsx(StyledFiltersAndBarsSkeleton, { children: _jsxs("div", { className: "barsShimmer", children: [showGroupBars && (_jsxs("div", { className: "legendsShimmer", children: [_jsxs("div", { className: "groupingShimmer", children: [_jsx(Shimmer, { width: "1rem", height: "1rem", borderRadius: "5px" }), _jsx(Shimmer, { width: "70px", height: "14px", borderRadius: "4px" })] }), _jsxs("div", { className: "groupingShimmer", children: [_jsx(Shimmer, { width: "1rem", height: "1rem", borderRadius: "5px" }), _jsx(Shimmer, { width: "60px", height: "14px", borderRadius: "4px" })] })] })), showGroupBars && (_jsxs("div", { className: "barRowShimmer", children: [_jsx(Shimmer, { width: "60%", height: "0.5rem", borderRadius: "10px" }), _jsx(Shimmer, { width: "60px", height: "14px", borderRadius: "4px" })] })), _jsxs("div", { className: "barRowShimmer", children: [_jsx(Shimmer, { width: "40%", height: "0.5rem", borderRadius: "10px" }), _jsx(Shimmer, { width: "50px", height: "14px", borderRadius: "4px" })] })] }) }));
};
