import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Logo, StyledWelcomeHeader } from './WelcomeHeader.styled';
import logo from '../../../styles/logo/logo2.png';
export default function WelcomeHeader() {
    return (_jsx(StyledWelcomeHeader, { children: _jsxs("div", { className: "appName", children: [_jsx(Logo, { src: logo, alt: "B" }), _jsx("strong", { className: "uqs", children: "uqs" })] }) }));
}
