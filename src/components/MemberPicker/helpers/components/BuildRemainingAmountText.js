import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { displayCurrencyAndAmount } from '../../../../helpers/displayCurrencyAndAmount';
import { significantDigitsFromTicker } from '../../../../helpers/openExchangeRates';
export const BuildRemainingAmountText = (totalSelectedAmount, selectedCurrency, totalAmount) => {
    const difference = totalAmount - totalSelectedAmount;
    return (_jsx("div", { className: "secondRow", children: difference > 0 ? (_jsxs("div", { children: [_jsx("span", { className: "greenText", children: displayCurrencyAndAmount(Math.abs(difference)
                        .toFixed(significantDigitsFromTicker(selectedCurrency))
                        .toString(), selectedCurrency) }), ' ', _jsx("span", { className: "text", children: "to allocate" })] })) : difference < 0 ? (_jsxs("div", { children: [_jsx("span", { className: "redText", children: displayCurrencyAndAmount(Math.abs(difference)
                        .toFixed(significantDigitsFromTicker(selectedCurrency))
                        .toString(), selectedCurrency) }), ' ', _jsx("span", { className: "text", children: "over" })] })) : null }));
};
