import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledConnectionRequest } from './ConnectionRequest.styled';
import { useAcceptConnectionRequest } from '../../api/auth/CommandHooks/useAcceptConnectionRequest';
import { useDeclineConnectionRequest } from '../../api/auth/CommandHooks/useDeclineConnectionRequest';
import MyButton from '../MyButton/MyButton';
const ConnectionRequest = ({ connectionRequest, }) => {
    const accept = useAcceptConnectionRequest();
    const decline = useDeclineConnectionRequest();
    return (_jsxs(StyledConnectionRequest, { children: [_jsx("div", { className: "mainMsg", children: _jsxs("div", { className: "message", children: [_jsx("strong", { children: connectionRequest.senderUsername }), " wants to split expenses with you"] }) }), _jsxs("div", { className: "actions", children: [_jsx(MyButton, { onClick: () => accept.mutate(connectionRequest.id), isLoading: accept.isPending, hasFailed: accept.isError, children: "Accept" }), _jsx(MyButton, { onClick: () => decline.mutate(connectionRequest.id), isLoading: decline.isPending, hasFailed: decline.isError, variant: "secondary", children: "Decline" })] })] }));
};
export default ConnectionRequest;
