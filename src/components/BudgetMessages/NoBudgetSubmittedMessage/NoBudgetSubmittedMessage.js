import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledNoBudgetSubmittedMessage } from './NoBudgetSubmittedMessage.styled';
export const NoBudgetSubmittedMessage = ({ noSubmissions }) => {
    return (_jsx(StyledNoBudgetSubmittedMessage, { children: _jsx("div", { className: "main", children: _jsxs("div", { className: "signParagraphWrap", children: [_jsx("div", { className: "sign", children: _jsx(IonIcon, { name: "information-circle-outline", className: "information" }) }), _jsx("div", { className: "paragraph", children: _jsx("div", { className: "firstParagraph", children: noSubmissions ? 'No budgets have been submitted.' : 'No active budget.' }) })] }) }) }));
};
