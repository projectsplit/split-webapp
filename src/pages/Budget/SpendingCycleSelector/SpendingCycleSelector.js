import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { StyledSpendingCycleSelector } from './SpendingCycleSelector.styled';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
const SpendingCycleSelector = forwardRef(({ onClick, error, children, open, inputError }, ref) => {
    return (_jsxs(StyledSpendingCycleSelector, { ref: ref, error: error, onClick: onClick, open: open, inputError: inputError, children: [_jsx("div", { className: "currencyOption", children: open ? (_jsx(FaAngleUp, { className: "angle" })) : (_jsx(FaAngleDown, { className: "angle" })) }), children] }));
});
export default SpendingCycleSelector;
