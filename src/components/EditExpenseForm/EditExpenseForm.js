import { jsx as _jsx } from "react/jsx-runtime";
import ExpenseForm from '../ExpenseForm/ExpenseForm';
const EditExpenseForm = ({ groupId, expense, timeZoneId, menu, selectedExpense, timeZoneCoordinates, isPersonal, groupMembers, currency, isnonGroupExpense, nonGroupUsers, isCreateExpense, }) => {
    if (!expense) {
        return _jsx("div", { children: "Error: Expense not found." });
    }
    return (_jsx(ExpenseForm, { expense: expense, groupId: groupId, menu: menu, timeZoneCoordinates: timeZoneCoordinates, timeZoneId: timeZoneId, header: "Edit Expense", selectedExpense: selectedExpense, isCreateExpense: isCreateExpense, isPersonal: isPersonal, currency: currency, groupMembers: groupMembers, isnonGroupExpense: isnonGroupExpense, nonGroupUsers: nonGroupUsers }));
};
export default EditExpenseForm;
