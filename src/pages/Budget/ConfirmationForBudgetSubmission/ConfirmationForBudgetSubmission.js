import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledConfirmationForBudgetSubmission } from './ConfirmationForBudgetSubmission.styled';
import MyButton from '../../../components/MyButton/MyButton';
export default function ConfirmationForBudgetSubmission({ submitBudget, 
// setMenu,
menu, }) {
    return (_jsxs(StyledConfirmationForBudgetSubmission, { children: [_jsxs("div", { className: "header", children: [' ', _jsx("strong", { children: "Submit Budget" })] }), _jsx("div", { className: "prompt", children: "Submitting a new budget will replace your current one.Would you like to continue?" }), _jsx(MyButton, { onClick: submitBudget, children: "Continue" }), _jsx(MyButton, { onClick: () => (menu.value = null), children: "Cancel" })] }));
}
