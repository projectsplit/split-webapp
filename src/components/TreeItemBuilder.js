import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { displayCurrencyAndAmount } from '../helpers/displayCurrencyAndAmount';
export const TreeItemBuilder = (details) => {
    if (!details)
        return [];
    const filteredDetails = Object.fromEntries(Object.entries(details).filter(([_, amount]) => amount !== 0));
    const allSettled = Object.keys(filteredDetails).length === 0;
    if (allSettled) {
        return [
            _jsx("div", { className: "groupsInfo", children: _jsxs("div", { className: "settled", children: [_jsxs("div", { children: [_jsx("strong", { children: "You" }), "\u00A0are settled\u00A0"] }), _jsx(IonIcon, { name: "checkmark-sharp", className: "checkmark" })] }) }),
        ];
    }
    return Object.entries(filteredDetails).map(([currency, amount], index) => {
        if (amount > 0) {
            return (_jsxs("div", { className: "groupsInfo", children: [_jsx("strong", { children: "You" }), " owe", ' ', _jsx("span", { className: "owe", children: displayCurrencyAndAmount(Math.abs(amount).toString(), currency) })] }, index));
        }
        else if (amount < 0) {
            return (_jsxs("div", { className: "groupsInfo", children: [_jsx("strong", { children: "You" }), " are owed", ' ', _jsx("span", { className: "owed", children: displayCurrencyAndAmount(Math.abs(amount).toString(), currency) })] }, index));
        }
        else {
            return _jsx(_Fragment, {});
        }
    });
};
