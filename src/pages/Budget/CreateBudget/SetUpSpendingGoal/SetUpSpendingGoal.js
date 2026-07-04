import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSetUpSpendingGoal } from './SetUpSpendingGoal.styled';
import InputMonetary from '../../../../components/InputMonetary/InputMonetary';
export default function SetUpSpendingGoal({ menu, displayedAmount, selectedCurrency, onChange, $inputError, }) {
    return (_jsxs(StyledSetUpSpendingGoal, { children: [_jsx("div", { className: "prompt", children: "Spending goal" }), _jsx("div", { className: "inputAndErrorsWrapper", children: _jsx(InputMonetary, { currencyMenu: menu, value: displayedAmount.value, onChange: onChange, selectedCurrency: selectedCurrency, "$inputError": $inputError }) })] }));
}
