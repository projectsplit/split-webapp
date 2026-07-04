import { jsx as _jsx } from "react/jsx-runtime";
import { StyledBottomMenu } from './BottomMenu.styled';
export default function BottomMenu({ children, height }) {
    return _jsx(StyledBottomMenu, { height: height, children: children });
}
