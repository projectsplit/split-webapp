import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FaCheck } from 'react-icons/fa';
import { displayCurrencyAndAmount } from '../../../../helpers/displayCurrencyAndAmount';
export const NameAndAmounts = ({ category, m, onClick, currency, }) => {
    return (_jsx(_Fragment, { children: category.value === 'Shares' || category.value === 'Percentages' ? (_jsxs("div", { className: "textAndCheck", children: [_jsx("div", { className: "tick-cube", onClick: onClick, children: _jsx(FaCheck, { className: "checkmark" }) }), _jsxs("div", { className: "nameAndAmount", children: [_jsxs("div", { className: "name", children: [" ", m.name] }), _jsx("div", { className: "amount", children: displayCurrencyAndAmount(m.actualAmount === '' ? '0' : m.actualAmount, currency) })] })] })) : (_jsxs("div", { className: "textAndCheck", children: [_jsx("div", { className: "tick-cube", onClick: onClick, children: _jsx(FaCheck, { className: "checkmark" }) }), m.name] })) }));
};
export default NameAndAmounts;
