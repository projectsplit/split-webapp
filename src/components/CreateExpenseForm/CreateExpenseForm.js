import { jsx as _jsx } from "react/jsx-runtime";
import ExpenseForm from '../ExpenseForm/ExpenseForm';
const CreateExpenseForm = ({ groupId, expense, timeZoneId, menu, timeZoneCoordinates, header, selectedExpense, isPersonal, isnonGroupExpense, groupMembers, currency, nonGroupUsers, nonGroupMenu, fromHomeGroup, fromHome, fromPersonal, }) => {
    return (_jsx(ExpenseForm, { groupMembers: groupMembers, expense: expense, groupId: groupId, menu: menu, timeZoneCoordinates: timeZoneCoordinates, timeZoneId: timeZoneId, header: header, isCreateExpense: true, selectedExpense: selectedExpense, isPersonal: isPersonal, isnonGroupExpense: isnonGroupExpense, currency: currency, nonGroupUsers: nonGroupUsers, nonGroupMenu: nonGroupMenu, fromHomeGroup: fromHomeGroup, fromHome: fromHome, fromPersonal: fromPersonal }));
};
export default CreateExpenseForm;
