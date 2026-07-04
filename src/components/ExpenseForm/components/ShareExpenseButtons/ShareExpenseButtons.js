import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledShareExpenseButtons } from './ShareExpenseButtons.styled';
import { MdCallSplit } from 'react-icons/md';
export const ShareExpenseButtons = ({ isPersonal, amountNumber, nonGroupUsers, adjustParticipants, adjustPayers, fromHome, nonGroupMenu, setMakePersonalClicked, }) => {
    const showShareExpenseButton = isPersonal.value && amountNumber && nonGroupUsers.value.length === 0;
    const showMakePersonal = isPersonal.value === false &&
        amountNumber &&
        !(adjustParticipants.filter((m) => m.selected).length === 1 &&
            adjustParticipants[0].name === 'you' &&
            adjustPayers.filter((m) => m.selected).length === 1 &&
            adjustPayers[0].name === 'you');
    return (_jsxs(StyledShareExpenseButtons, { children: [showShareExpenseButton && fromHome && nonGroupMenu ? (_jsx("div", { className: "shareExpenseOption", children: _jsxs("div", { className: "button", onClick: () => (nonGroupMenu.value = 'nonGroupExpenseUsers'), children: [_jsxs("div", { className: "textAndIcon", children: [_jsx("div", { className: "text", children: "Split Expense" }), _jsx(MdCallSplit, { className: 'icon' })] }), ' '] }) })) : null, showMakePersonal && fromHome && nonGroupMenu ? (_jsx("div", { className: "shareExpenseOption", children: _jsxs("div", { className: "button", onClick: () => {
                        setMakePersonalClicked(true);
                        isPersonal.value = true;
                        nonGroupUsers.value = [];
                    }, children: ["Make Personal", ' '] }) })) : null, amountNumber &&
                nonGroupMenu &&
                !fromHome &&
                adjustPayers.length === 0 &&
                adjustParticipants.length === 0 ? (_jsx("div", { className: "shareExpenseOption", children: _jsxs("div", { className: "button", onClick: () => (nonGroupMenu.value = 'nonGroupExpenseUsers'), children: ["Shared with you and...", ' '] }) })) : null] }));
};
