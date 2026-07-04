import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledRecommendation } from './Recommendation.styled';
import IonIcon from '@reacticons/ionicons';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
export default function Recommendation({ onClick, days, offBudgetAmount, reduceAmount, style, currency, closeButton, budgetFrequency, }) {
    const displayedDays = (days) => {
        const days2number = parseFloat(days);
        if (days2number < 1)
            return days2number.toFixed(1).toString();
        else
            return days2number.toFixed(0).toString();
    };
    return (_jsx(StyledRecommendation, { style: style, children: _jsxs("div", { className: "main", children: [_jsxs("div", { className: "signParagraphWrap", children: [_jsx("div", { className: "sign", children: _jsx(IonIcon, { name: "warning-outline", className: "warning" }) }), _jsxs("div", { className: "paragraphs", children: [_jsxs("div", { className: "firstParagraph", children: ["Reduce your spending by", ' ', _jsx("strong", { className: "amount", children: displayCurrencyAndAmount(reduceAmount, currency) }), ' ', "per day to not exceed your ", budgetFrequency === 0 ? 'weekly' : budgetFrequency === 1 ? 'monthly' : '', " cap."] }), _jsxs("div", { className: "secondParagraph", children: ["At this rate you will reach your cap in", ' ', _jsx("strong", { children: displayedDays(days) }), ' ', displayedDays(days) === '1' ? 'day' : 'days', " and you will be off budget by", ' ', _jsx("strong", { className: "amount", children: displayCurrencyAndAmount(offBudgetAmount, currency) }), ' ', "at the end of the ", budgetFrequency === 0 ? 'week' : budgetFrequency === 1 ? 'month' : 'period', "."] })] })] }), closeButton && (_jsx("div", { className: "closeButton", onClick: onClick, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }))] }) }));
}
