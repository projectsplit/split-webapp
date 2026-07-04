import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { displayCurrencyAndAmount } from './displayCurrencyAndAmount';
export const joinAmounts = (entries) => {
    const amounts = entries.map(([currency, amount]) => displayCurrencyAndAmount(Math.abs(amount).toString(), currency));
    if (amounts.length === 1) {
        return _jsx(_Fragment, { children: amounts[0] });
    }
    else if (amounts.length === 2) {
        return (_jsxs(_Fragment, { children: [amounts[0], _jsx("span", { style: { color: '#a3a3a3' }, children: " and " }), amounts[1]] }));
    }
    else {
        const result = [];
        for (let i = 0; i < amounts.length; i++) {
            if (i > 0 && i < amounts.length - 1) {
                result.push(_jsx("span", { style: { color: '#a3a3a3' }, children: ', ' }, `comma-${i}`));
            }
            if (i === amounts.length - 1) {
                result.push(_jsx("span", { style: { color: '#a3a3a3' }, children: ' and ' }, `and-${i}`));
            }
            result.push(amounts[i]);
        }
        return _jsx(_Fragment, { children: result });
    }
};
