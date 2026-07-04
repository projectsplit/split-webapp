import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { StyledConnectRequestConfirm } from './ConnectRequestConfirm.styled';
import MyButton from '../../../MyButton/MyButton';
/**
 * One-time confirmation before splitting expenses with a user you have
 * never interacted with. Sends them a connection request to accept.
 */
export default function ConnectRequestConfirm({ username, isLoading, onConfirm, onCancel, }) {
    return (_jsx(StyledConnectRequestConfirm, { onClick: onCancel, children: _jsxs("div", { className: "card", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "title", children: ["Do you know ", username, "?"] }), _jsxs("div", { className: "message", children: ["You have not split expenses with ", _jsx("strong", { children: username }), " before. Send them a request \u2014 once they accept, you will be able to add each other to shared expenses."] }), _jsxs("div", { className: "buttons", children: [_jsx(MyButton, { onClick: onConfirm, isLoading: isLoading, children: "Send request" }), _jsx(MyButton, { variant: "secondary", onClick: onCancel, children: "Cancel" })] })] }) }));
}
