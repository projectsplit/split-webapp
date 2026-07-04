import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledExpense } from './Expense.styled';
import { MdLocationOn, MdGroup } from 'react-icons/md';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { TimeOnly } from '../../helpers/timeHelpers';
import Pill from '../Pill/Pill';
import labelColors from '../../labelColors';
import { Mode } from '@/types';
import { useLongPress } from '../../hooks/useLongPress';
const Expense = ({ timeZoneId, onClick, onLongPress, amount, currency, description, location, occurred, userAmount, labels, mode, }) => {
    const longPressHandlers = useLongPress(onLongPress ?? (() => { }));
    // console.log(labels)
    return (_jsxs(StyledExpense, { onClick: onClick, userAmount: userAmount, ...longPressHandlers, children: [_jsxs("div", { className: "topRow", children: [_jsxs("div", { className: "icons", children: [location ? _jsx(MdLocationOn, { className: "locationIcon" }) : null, labels.length > 0 ? (_jsx("div", { className: "labels", children: labels.map((l) => (_jsx(Pill, { "$textColor": '#000000c8', title: l.text, color: l.color === '' ? 'white' : labelColors[l.color], closeButton: false, "$border": false, fontSize: "14px", children: mode === Mode.Personal && !l.id.includes('_') && (_jsx(MdGroup, { style: { marginRight: '4px' } })) }, l.id))) })) : null] }), _jsx("strong", { className: "time", children: TimeOnly(occurred, timeZoneId) })] }), _jsxs("div", { className: "descrAndAmounts", children: [_jsx("div", { className: "descr", children: description ? (_jsx("span", { children: description })) : location ? (_jsx("span", { children: location.google?.name })) : ('') }), mode === Mode.Personal ? (_jsx("div", { className: "amounts", children: _jsxs("div", { className: "userShare", children: [amount === 0 ? '' : _jsx("div", { className: "legendUser" }), _jsx("div", { className: "amount", children: amount === 0
                                        ? ''
                                        : displayCurrencyAndAmount(Math.abs(amount).toString(), currency) })] }) })) : (_jsxs("div", { className: "amounts", children: [_jsxs("div", { className: "groupTotal", children: [amount === 0 ? '' : _jsx("div", { className: "legendGroup" }), _jsx("div", { className: "amount", children: displayCurrencyAndAmount(Math.abs(amount).toString(), currency) })] }), _jsxs("div", { className: "userShare", children: [userAmount === 0 ? '' : _jsx("div", { className: "legendUser" }), _jsx("div", { className: "amount", children: userAmount === 0
                                            ? ''
                                            : displayCurrencyAndAmount(Math.abs(userAmount).toString(), currency) })] })] }))] })] }));
};
export default Expense;
