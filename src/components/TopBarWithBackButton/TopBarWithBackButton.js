import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BiArrowBack } from 'react-icons/bi';
import { StyledTopBarWithBackButton } from './TopBarWithBackButton.styled';
export default function TopBarWithBackButton({ onClick, header, }) {
    return (_jsxs(StyledTopBarWithBackButton, { children: [_jsx("div", { className: "backButtonContainer", children: _jsx(BiArrowBack, { className: "backButton", onClick: onClick }) }), _jsx("div", { className: "descr", children: header })] }));
}
