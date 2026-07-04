import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { getSymbolFromCurrency } from '../../../../helpers/currency-symbol-map';
import { memo } from 'react';
import AutoWidthInput from '../../../AutoWidthInput';
const Right = ({ screenQuantity, id, locked, selectedCurrency, handleInputBlur, changeAmount, toggleLock, category, memberAmounts, inputRef, }) => {
    const totalSharesValue = memberAmounts.reduce((sum, member) => sum + Number(member.screenQuantity), 0);
    const formattedTotalShares = totalSharesValue === 0
        ? ''
        : Number(totalSharesValue)
            .toFixed(2)
            .replace(/\.?0+$/, '');
    switch (category.value) {
        case 'Amounts':
            return (_jsxs("div", { className: "right", children: [_jsxs("div", { className: "inputField", children: [getSymbolFromCurrency(selectedCurrency), _jsx(AutoWidthInput, { className: "amount-input", inputMode: "decimal", value: screenQuantity, onBlur: () => handleInputBlur(id), onChange: (e) => changeAmount(id, e), onClick: (e) => e.stopPropagation(), category: category.value, ref: inputRef })] }), _jsx("div", { onClick: (e) => toggleLock(e, id), children: locked ? (_jsx(HiLockClosed, { className: "locked-icon" })) : (_jsx(HiLockOpen, { className: "unlocked-icon" })) })] }));
        case 'Shares':
            return (_jsx("div", { className: "right", children: _jsxs("div", { className: "inputField", children: [_jsx(AutoWidthInput, { className: "amount-input", inputMode: "decimal", value: screenQuantity, onBlur: () => handleInputBlur(id), onChange: (e) => changeAmount(id, e), onClick: (e) => e.stopPropagation(), category: category.value, ref: inputRef }), _jsx("div", { className: "shares", children: _jsxs("div", { className: "fraction", children: [_jsx("div", { className: "nominatorDenominator", children: screenQuantity === formattedTotalShares ? ('') : (_jsx(_Fragment, { children: screenQuantity === '' || screenQuantity === '0' ? (_jsx("span", { className: "numerator" })) : screenQuantity === formattedTotalShares ? (_jsx("span", { className: "numerator", children: "1" })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "numerator", children: screenQuantity }), "/", _jsx("span", { className: "denominator", children: formattedTotalShares })] })) })) }), _jsx("span", { className: "shares-label", children: "shares" })] }) })] }) }));
        case 'Percentages':
            return (_jsxs("div", { className: "right", children: [_jsxs("div", { className: "inputField", children: ["%", _jsx(AutoWidthInput, { className: "amount-input", inputMode: "decimal", value: screenQuantity, onBlur: () => handleInputBlur(id), onChange: (e) => changeAmount(id, e), onClick: (e) => e.stopPropagation(), category: category.value, ref: inputRef })] }), _jsx("div", { onClick: (e) => toggleLock(e, id), children: locked ? (_jsx(HiLockClosed, { className: "locked-icon" })) : (_jsx(HiLockOpen, { className: "unlocked-icon" })) })] }));
        default:
            return null;
    }
};
export default memo(Right);
