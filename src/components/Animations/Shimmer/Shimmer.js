import { jsx as _jsx } from "react/jsx-runtime";
import { StyledShimmer } from './Shimmer.styled';
export const Shimmer = ({ width, height, borderRadius, }) => {
    return (_jsx(StyledShimmer, { "$width": width, "$height": height, "$borderRadius": borderRadius }));
};
