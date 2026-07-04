import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledMakeBudgetActiveMenu } from './MakeBudgetActiveMenu.styled';
import MyButton from '@/components/MyButton/MyButton';
import Separator from '@/components/Separator/Separator';
import { FaQuestion } from 'react-icons/fa';
export default function MakeBudgetActiveMenu({ menu, title, hasActiveBudgetData, hasInactiveBudgetData, onConfirm, }) {
    return (_jsxs(StyledMakeBudgetActiveMenu, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx(FaQuestion, { name: "warning-outline", className: "infoLogo" }), _jsx("span", { children: title ? title : 'Warning' }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsxs("div", { className: "info", children: [hasActiveBudgetData && (_jsx("p", { children: "You already have an active budget. Do you want to make this budget your active budget instead?" })), !hasActiveBudgetData && hasInactiveBudgetData && (_jsx("p", { children: " Do you want to make this budget your active budget?" }))] }), _jsxs("div", { className: "buttons", children: [_jsx("div", { className: "confirmButton", children: _jsx(MyButton, { onClick: () => {
                                onConfirm(true);
                                menu.value = null;
                            }, fontSize: "16", children: "Active" }) }), _jsx("div", { className: "confirmButton", children: _jsx(MyButton, { onClick: () => {
                                onConfirm(false);
                                menu.value = null;
                            }, fontSize: "16", children: "Inactive" }) })] })] }));
}
