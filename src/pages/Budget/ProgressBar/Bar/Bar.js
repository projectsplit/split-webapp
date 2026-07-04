import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { TbTargetArrow } from 'react-icons/tb';
import { StyledBar } from './Bar.styled';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { getIsoDateInfo } from '@/helpers/getIsoDateInfo';
export const Bar = ({ color, data, }) => {
    let percentage = 0;
    if (data?.totalAmountSpent !== undefined && data?.goal !== undefined) {
        const totalAmountSpent = parseFloat(data.totalAmountSpent);
        const goal = parseFloat(data.goal);
        if (!isNaN(totalAmountSpent) && !isNaN(goal)) {
            percentage = parseFloat(((totalAmountSpent / goal) * 100).toFixed(1));
        }
    }
    const startDateDecomposed = getIsoDateInfo(data?.startDate);
    const endDateDecomposed = getIsoDateInfo(data?.endDate);
    return (_jsxs(StyledBar, { "$percentage": percentage, "$color": color, children: [_jsxs("div", { className: "budgetTitle", children: [startDateDecomposed.dateNumber, " ", startDateDecomposed.month, " -", ' ', endDateDecomposed.dateNumber, " ", endDateDecomposed.month] }), _jsxs("div", { className: "barAndInfo", children: [_jsx(TbTargetArrow, { className: "targetIcon" }), _jsxs("div", { className: "wrapper", children: [_jsx("div", { className: "barWrapper", children: _jsx("div", { className: "bar" }) }), _jsx("div", { className: "monetaryProgress", children: data?.currency !== undefined ? (_jsxs("strong", { children: [displayCurrencyAndAmount(data.totalAmountSpent, data.currency), ' ', "/ ", displayCurrencyAndAmount(data.goal, data.currency)] })) : ('') })] }), _jsxs("div", { className: "amount", children: [percentage < 0 ? 0 : percentage, "%"] })] })] }));
};
