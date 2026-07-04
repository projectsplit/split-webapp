import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRevokeInvitation } from '../../../api/auth/CommandHooks/useRevokeInvitation';
import { useSendInvitation } from '../../../api/auth/CommandHooks/useSendInvitation';
import MyButton from '../../../components/MyButton/MyButton';
export const SearchResultItem = ({ userId, username, isAlreadyInvited, isGroupMember, groupId, onInviteSuccess, guestId, userInvitationSent, guestName, }) => {
    const { mutate: revoke, isPending: isRevoking, isError: isRevokeError, } = useRevokeInvitation(userInvitationSent);
    const { mutate: send, isPending: isSending, isError: isSendError, } = useSendInvitation(userInvitationSent);
    const isPending = isAlreadyInvited ? isRevoking : isSending;
    const isError = isAlreadyInvited ? isRevokeError : isSendError;
    if (isGroupMember) {
        return (_jsxs("div", { className: "search-result", children: [_jsx("div", { className: "top-row", children: _jsx("div", { children: username }) }), _jsx("div", { className: "bottom-row", children: "already a member" })] }));
    }
    const onClick = () => {
        if (isAlreadyInvited) {
            revoke({
                groupId,
                receiverId: userId,
                onSuccess: () => onInviteSuccess(!isAlreadyInvited),
            });
        }
        else {
            send({
                groupId,
                guestId: guestId && guestId != '' ? guestId : null,
                receiverId: userId,
                onSuccess: () => onInviteSuccess(!isAlreadyInvited),
                guestName: guestName && guestName != '' ? guestName : null,
            });
        }
    };
    return (_jsx("div", { className: "search-result", children: _jsxs("div", { className: "top-row", children: [_jsx("div", { children: username }), _jsx(MyButton, { isLoading: isPending, variant: isAlreadyInvited ? 'secondary' : 'primary', onClick: isPending ? undefined : onClick, hasFailed: isError, children: isAlreadyInvited ? 'Uninvite' : 'Invite' })] }) }));
};
