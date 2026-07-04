import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
import { StyledSimpleOnTrackMessage } from './SimpleOnTrackMessage.styled';
import IonIcon from '@reacticons/ionicons';
export default function SimpleOnTrackMessage({ onClick, style, closeButton, startDate, endDate, }) {
    const getMessage = () => {
        if (endDate && dateIsInPast(endDate))
            return 'This budget has expired.';
        if (dateIsInFuture(startDate))
            return 'Your budget is not yet in effect.';
        return 'You are on track to meeting your spending goal.';
    };
    return (_jsx(StyledSimpleOnTrackMessage, { style: style, children: _jsxs("div", { className: "main", children: [_jsxs("div", { className: "signParagraphWrap", children: [_jsx("div", { className: "sign", children: _jsx(IonIcon, { name: "information-circle-outline", className: "information" }) }), _jsx("div", { className: "paragraph", children: _jsx("div", { className: "firstParagraph", children: getMessage() }) })] }), closeButton && (_jsx("div", { className: "closeButton", onClick: onClick, children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }))] }) }));
}
