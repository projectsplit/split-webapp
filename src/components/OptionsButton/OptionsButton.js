import { jsx as _jsx } from "react/jsx-runtime";
import { StyledOptionsButton } from './OptionsButton.styled';
export default function OptionsButton({ onClick, children, }) {
    return (_jsx(StyledOptionsButton, { onClick: onClick, children: children }));
}
