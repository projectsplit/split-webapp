import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledNewButton } from './NewButton.styled';
import { FaPlus } from 'react-icons/fa';
export default function NewButton({ onClick }) {
    return (_jsxs(StyledNewButton, { onClick: onClick, children: [_jsx(FaPlus, { className: "plus" }), _jsx("div", { className: "new", children: " New" })] }));
}
