import { jsx as _jsx } from "react/jsx-runtime";
import { StyledSettleUpButton } from './SettleUpButton.Styled';
export default function SettleUpButton({ onClick, children, }) {
    return (_jsx(StyledSettleUpButton, { onClick: onClick, children: _jsx("div", { children: children }) }));
}
