import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledConfirmationForBudgetDeletion } from './ConfirmationForBudgetDeletion.styled';
import MyButton from '../../../components/MyButton/MyButton';
export default function ConfirmationForBudgetDeletion({ deleteBudget, menu, selectedBudget, isLoading }) {
    return (_jsxs(StyledConfirmationForBudgetDeletion, { children: [_jsxs("div", { className: "header", children: [' ', _jsx("strong", { children: "Delete Budget" })] }), _jsxs("div", { className: "prompt", children: ["Are you sure you want to delete \"", selectedBudget.descr, "\"?"] }), _jsx(MyButton, { isLoading: isLoading, onClick: () => deleteBudget(selectedBudget.id), children: "Confirm" }), _jsx(MyButton, { onClick: () => (menu.value = null), children: "Cancel" })] }));
}
