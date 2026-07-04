import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoClose } from 'react-icons/io5';
import { StyledExpenseFormHeader } from './ExpenseFormHeader.styled';
export const ExpenseFormHeader = ({ header, isnonGroupExpense, fromHome, nonGroupUsers, groupMembers, isPersonal, fromHomeGroup, menu, }) => {
    return (_jsxs(StyledExpenseFormHeader, { children: [_jsx("div", { className: "gap" }), _jsx("div", { className: "title", children: header }), _jsx("div", { className: "closeButtonContainer", onClick: () => {
                    if (isnonGroupExpense && isnonGroupExpense?.value) {
                        if (fromHome) {
                            nonGroupUsers.value = [];
                            groupMembers.value = [];
                            isPersonal.value = true;
                            isnonGroupExpense.value = false;
                            if (fromHomeGroup) {
                                fromHomeGroup.value = null;
                            }
                        }
                    }
                    menu.value = null;
                }, children: _jsx(IoClose, { className: "closeButton" }) })] }));
};
