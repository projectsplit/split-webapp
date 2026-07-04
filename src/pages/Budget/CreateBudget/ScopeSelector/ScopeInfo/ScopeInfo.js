import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledScopeInfo } from './ScopeInfo.styled';
export default function ScopeInfo({ menu, }) {
    return (_jsxs(StyledScopeInfo, { children: [_jsxs("div", { className: "header", children: [_jsxs("div", { className: "info", children: [_jsx(IonIcon, { name: "information-circle-outline", className: "infoLogo" }), _jsx("strong", { children: "Scope" })] }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "text", children: _jsx("span", { className: "firstP", children: "Choose which expense types this budget should apply to. Default setting: All expenses (including group, non-group, and personal)." }) })] }));
}
