import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledErrorMenu } from './ErrorMenu.styled';
import Separator from '../../Separator/Separator';
export default function ErrorMenu({ menu, children, type }) {
    return (_jsxs(StyledErrorMenu, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(IonIcon, { name: "information-circle-outline", className: "infoLogo" }), _jsx("span", { children: "Error" }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsx("div", { className: "info", children: type === 'expense'
                    ? 'Expense not found. Possibly already deleted by another user.'
                    : 'Transfer not found. Possibly already deleted by another user.' })] }));
}
