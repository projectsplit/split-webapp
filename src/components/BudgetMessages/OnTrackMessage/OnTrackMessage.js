import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledOnTrackMessage } from './OnTrackMessage.styled';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
export default function OnTrackMessage({ onClick, amount, style, currency, closeButton, budgetFrequency, }) {
    return (_jsx(StyledOnTrackMessage, { style: style, children: _jsxs("div", { className: "main", children: [_jsxs("div", { className: "signParagraphWrap", children: [_jsx("div", { className: "sign", children: _jsx(IonIcon, { name: "information-circle-outline", className: "information" }) }), _jsxs("div", { className: "paragraphs", children: [_jsx("div", { className: "firstParagraph", children: "You are on track to meeting your spending goal." }), _jsxs("div", { className: "secondParagraph", children: ["Spending at this rate will save you", ' ', _jsx("strong", { className: "amount", children: displayCurrencyAndAmount(amount, currency) }), ' ', "at the end of the ", budgetFrequency === 0 ? 'week' : budgetFrequency === 1 ? 'month' : 'period', "."] })] })] }), closeButton && (_jsx("div", { className: "closeButton", onClick: onClick, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }))] }) }));
}
