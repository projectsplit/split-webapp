import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledConfirmation } from './Confirmation.styled';
import IonIcon from '@reacticons/ionicons';
import Separator from '../../Separator/Separator';
import MyButton from '../../MyButton/MyButton';
export default function InfoContainer({ children, isLoading, onClick, menu, header, }) {
    return (_jsxs(StyledConfirmation, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(IonIcon, { name: "information-circle-outline", className: "infoLogo" }), _jsx("span", { children: header }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsxs("div", { className: "info", children: [children, _jsx("div", {})] }), _jsxs("div", { className: "buttons", children: [_jsx(MyButton, { isLoading: isLoading, onClick: onClick, children: "Confirm" }), _jsx(MyButton, { variant: "secondary", onClick: () => (menu.value = null), children: "Cancel" })] })] }));
}
