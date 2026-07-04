import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledInput, StyledInputMonetary } from './InputMonetary.styled';
import { getSymbolFromCurrency } from '../../helpers/currency-symbol-map';
import { FaAngleDown } from 'react-icons/fa';
export default React.forwardRef(function InputMonetary({ onBlur, onFocus, onChange, value, $inputError, 
// setMenu,
currencyMenu, selectedCurrency, autoFocus, }, ref) {
    return (_jsxs(StyledInputMonetary, { "$inputError": $inputError, children: [_jsx("div", { className: "currencySelectorWrapper", children: _jsxs("div", { className: "currencySelector", onClick: () => (currencyMenu.value = 'currencyOptions'), children: [_jsx("div", { className: selectedCurrency?.flagClass }), _jsx("div", { children: selectedCurrency?.symbol }), _jsx(FaAngleDown, { className: "angleDown" })] }) }), _jsx(StyledInput, { type: "text", inputMode: "decimal", placeholder: getSymbolFromCurrency(selectedCurrency?.symbol) + '0', spellCheck: "false", autoComplete: "off", onBlur: onBlur, onFocus: onFocus, onChange: onChange, value: value, autoFocus: autoFocus })] }));
});
