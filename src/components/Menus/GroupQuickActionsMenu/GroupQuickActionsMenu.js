import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledGroupQuickActionsMenu } from './GroupQuickActionsMenu.styled';
import { BiTransfer } from 'react-icons/bi';
import { CiReceipt } from 'react-icons/ci';
import { GoPlusCircle } from 'react-icons/go';
import { FaUser } from 'react-icons/fa';
export default function GroupQuickActionsMenu({ menu, }) {
    return (_jsx(StyledGroupQuickActionsMenu, { children: _jsxs("div", { className: "buttons", children: [_jsx("div", { className: "new", onClick: () => (menu.value = 'newExpense'), children: _jsxs("div", { className: "wrapper", children: [_jsx(CiReceipt, { className: "icon" }), _jsx(GoPlusCircle, { className: "plus", style: { backgroundColor: 'rgb(81, 131, 238)' } }), _jsx("div", { className: "descr", children: "Expense" })] }) }), _jsx("div", { className: "new", onClick: () => (menu.value = 'newTransfer'), children: _jsxs("div", { className: "wrapper", children: [_jsx(BiTransfer, { className: "icon" }), _jsx(GoPlusCircle, { className: "plus", style: { backgroundColor: 'rgb(215, 146, 68)' } }), _jsx("div", { className: "descr", children: "Transfer" })] }) }), _jsx("div", { className: "new", onClick: () => (menu.value = 'newUser'), children: _jsxs("div", { className: "wrapper", children: [_jsx(FaUser, { className: "icon" }), _jsx(GoPlusCircle, { className: "plus", style: { backgroundColor: 'rgb(225, 81, 238)' } }), _jsx("div", { className: "descr", children: "New User" })] }) })] }) }));
}
