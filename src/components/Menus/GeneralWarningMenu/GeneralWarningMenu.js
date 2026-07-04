import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import Separator from '../../Separator/Separator';
import MyButton from '../../MyButton/MyButton';
import { StyledGeneralWarningMenu } from './GeneralWarningMenu.styled';
export default function GeneralWarningMenu({ menu, message, title, }) {
    return (_jsxs(StyledGeneralWarningMenu, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(IonIcon, { name: "warning-outline", className: "infoLogo" }), _jsx("span", { children: title ? title : 'Warning' }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsx("div", { className: "info", children: message }), _jsx("div", { className: "confirmButton", children: _jsx(MyButton, { onClick: () => (menu.value = null), fontSize: "16", children: "Confirm" }) })] }));
}
