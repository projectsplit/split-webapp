import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledInvitation } from './Invitation.styled';
import { useAcceptInvitation } from '../../api/auth/CommandHooks/useAcceptInvitation';
import { useDeclineInvitation } from '../../api/auth/CommandHooks/useDeclineInvitation';
import MyButton from '../MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
const Invitation = ({ invitation, menu }) => {
    const navigate = useNavigate();
    const accept = useAcceptInvitation(navigate, invitation, menu);
    const decline = useDeclineInvitation();
    return (_jsxs(StyledInvitation, { children: [_jsxs("div", { className: "mainMsg", children: [_jsxs("div", { className: "message", children: ["You have been invited to join ", _jsx("strong", { children: invitation.groupName }), ' ', !!invitation.guestId && (_jsxs("span", { children: [" to replace \"", invitation.guestName, "\""] }))] }), "\u00A0"] }), _jsxs("div", { className: "actions", children: [_jsx(MyButton, { onClick: () => {
                            accept.mutate(invitation.id);
                        }, isLoading: accept.isPending, hasFailed: accept.isError, children: "Accept" }), _jsx(MyButton, { onClick: () => decline.mutate(invitation.id), isLoading: decline.isPending, hasFailed: decline.isError, variant: "secondary", children: "Decline" })] })] }));
};
export default Invitation;
