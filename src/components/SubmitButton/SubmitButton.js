import { jsx as _jsx } from "react/jsx-runtime";
import { StyledSubmitButton } from './SubmitButton.styled';
export default function SubmitButton({ children, onClick, disabled, color, backgroundColor, }) {
    return (_jsx(StyledSubmitButton, { color: color, backgroundColor: backgroundColor, onClick: onClick, disabled: disabled, children: children }));
}
