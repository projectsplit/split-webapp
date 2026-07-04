import { jsx as _jsx } from "react/jsx-runtime";
import { Line, ShimmerRow } from './ShimmerUserRow.styled';
export default function ShimmerUserRow() {
    return (_jsx(ShimmerRow, { children: _jsx(Line, {}) }));
}
