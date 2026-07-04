import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledActionsMenu } from './ActionsMenu.styled';
import { FaReceipt } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
export default function ActionsMenu({ onClickExpense, onClickTransfer, bottom, }) {
    return (_jsx(StyledActionsMenu, { "$bottom": bottom, children: _jsxs("div", { className: "buttons", children: [_jsxs("div", { className: "new", onClick: onClickTransfer, children: [_jsx("div", { className: "descr", children: "Transfer" }), _jsx("div", { className: "wrapper", children: _jsx(BiTransfer, { className: "symbol" }) })] }), _jsxs("div", { className: "new", onClick: onClickExpense, children: [_jsx("div", { className: "descr", children: "Expense" }), _jsx("div", { className: "wrapper", children: _jsx(FaReceipt, { className: "symbol" }) })] })] }) }));
}
