import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledComment } from './Comment.Styled';
import IonIcon from '@reacticons/ionicons';
export default function Comment() {
    return (_jsxs(StyledComment, { children: [_jsxs("div", { className: "nameAndClose", children: [_jsx("strong", { className: "name", children: "You" }), _jsx(IonIcon, { name: "close-outline", className: "close" })] }), _jsxs("div", { className: "commentAndTime", children: [_jsx("div", { className: "comment", children: "kala ta les alla ante kai gamisou paliopoutanaki" }), _jsx("div", { className: "time", children: "12:00" })] })] }));
}
