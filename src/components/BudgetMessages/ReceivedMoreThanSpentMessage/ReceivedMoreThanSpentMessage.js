import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledReceivedMoreThanSpentMessage } from './ReceivedMoreThanSpentMessage.styled';
import IonIcon from '@reacticons/ionicons';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
export default function ReceivedMoreThanSpentMessage({ onClick, amount, style, currency, closeButton, budgetFrequency, }) {
    const negativeAmountToPositive = (parseFloat(amount) * -1).toString();
    return (_jsx(StyledReceivedMoreThanSpentMessage, { style: style, children: _jsxs("div", { className: "main", children: [_jsxs("div", { className: "signParagraphWrap", children: [_jsx("div", { className: "sign", children: _jsx(IonIcon, { name: "information-circle-outline", className: "information" }) }), _jsxs("div", { className: "paragraphs", children: [_jsxs("div", { className: "firstParagraph", children: ["You have received more funds than you have spent this", ' ', budgetFrequency === 0 ? 'week' : budgetFrequency === 1 ? 'month' : 'period', "."] }), _jsxs("div", { className: "secondParagraph", children: ["The total amount received in excess of your expenses is", ' ', _jsx("strong", { className: "amount", children: displayCurrencyAndAmount(negativeAmountToPositive, currency) }), ".", ' '] })] })] }), closeButton && (_jsx("div", { className: "closeButton", onClick: onClick, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }))] }) }));
}
