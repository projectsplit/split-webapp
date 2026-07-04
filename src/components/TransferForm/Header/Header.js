import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoClose } from 'react-icons/io5';
import { StyledHeader } from './Header.styled';
export const Header = ({ menu }) => {
    return (_jsxs(StyledHeader, { children: [_jsx("div", { className: "gap" }), _jsx("div", { className: "title", children: "New Transfer" }), _jsx("div", { className: "closeButtonContainer", onClick: () => (menu.value = null), children: _jsx(IoClose, { className: "closeButton" }) })] }));
};
