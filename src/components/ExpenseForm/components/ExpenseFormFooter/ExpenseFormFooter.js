import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signal } from '@preact/signals-react';
import MyButton from '@/components/MyButton/MyButton';
import LocationPicker from '@/components/LocationPicker/LocationPicker';
import { DateTime } from '@/components/DateTime';
import { StyledExpenseFormFooter } from './ExpenseFormFooter.styled';
export const ExpenseFormFooter = ({ onSubmit, isCreateExpense, isPendingCreateExpense, isPendingEditExpense, location, isMapOpen, timeZoneCoordinates, setLocation, setDescriptionError, expenseTime, setExpenseTime, timeZoneId, isDateShowing, showPicker, setShowPicker, }) => {
    return (_jsxs(StyledExpenseFormFooter, { children: [_jsx("div", { className: "submitButton", children: _jsx(MyButton, { fontSize: "16", onClick: onSubmit, isLoading: isCreateExpense ? isPendingCreateExpense : isPendingEditExpense, children: "Submit" }) }), _jsx(LocationPicker, { location: location, isMapOpen: isMapOpen, timeZoneCoordinates: timeZoneCoordinates, setLocation: setLocation, isCreateExpense: isCreateExpense, setDescriptionError: setDescriptionError }), _jsx(DateTime, { selectedDateTime: expenseTime, setSelectedDateTime: setExpenseTime, timeZoneId: timeZoneId, isEdit: !isCreateExpense, category: signal('Expense'), isDateShowing: isDateShowing, showPicker: showPicker, setShowPicker: setShowPicker })] }));
};
