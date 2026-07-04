import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import Separator from '../../Separator/Separator';
import { StyledRemoveWarning } from './RemoveWarning.styled';
import MyButton from '../../MyButton/MyButton';
export default function RemoveWarning({ header, menu, message, onConfirm, isLoading, }) {
    return (_jsxs(StyledRemoveWarning, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(IonIcon, { name: "information-circle-outline", className: "infoLogo" }), _jsx("span", { children: header }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsx("div", { className: "info", children: _jsxs("div", { className: "info", children: [message, _jsx("div", {})] }) }), onConfirm && (_jsxs("div", { className: "buttons", children: [_jsx(MyButton, { isLoading: isLoading, onClick: onConfirm, children: "Confirm" }), _jsx(MyButton, { variant: "secondary", onClick: () => (menu.value = null), children: "Cancel" })] }))] }));
}
