import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { StyledRevokeAccessItem } from './RevokeAccessItem.styled';
import MyButton from '../../../../components/MyButton/MyButton';
import { useRevokeInvitationCode } from '../../../../api/auth/CommandHooks/useRevokeInvitationCode';
import { IoCopy } from 'react-icons/io5';
import { copyToClipboard } from '../../../../helpers/copyToClipboars';
import { useEffect, useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import ShimerPlaceholder from '../../ShimerPlaceholder/ShimerPlaceholder';
import config from '../../../../config';
export default function RevokeAccessItem({ expires, id, maxUses, timesUsed, groupId, invitationCode, mostRecentCodeHasBeenRevoked, }) {
    const { mutate: mutateRevoke, isPending: isPendingRevoke } = useRevokeInvitationCode(groupId || '', 10, invitationCode, mostRecentCodeHasBeenRevoked);
    const [timeLeft, setTimeLeft] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const expiry = new Date(expires);
            const diff = expiry.getTime() - now.getTime();
            if (diff < 0) {
                setTimeLeft('Expired');
                clearInterval(interval);
            }
            else {
                // const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                // setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                if (isNaN(minutes) || isNaN(seconds)) {
                    setTimeLeft('NaN');
                }
                else if (minutes === 0) {
                    setTimeLeft(`${seconds}s`);
                }
                else {
                    setTimeLeft(`${minutes}m ${seconds}s`);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [expires]);
    return (_jsxs(StyledRevokeAccessItem, { children: [' ', _jsxs("div", { className: "codeAndCopy", onClick: () => copyToClipboard(id, `${config.clientUrl}/j/`), children: [_jsxs("div", { className: "code", children: [" ", id, " "] }), _jsx(IoCopy, {})] }), _jsxs("div", { className: "infoAndRevokeButton", children: [_jsxs("div", { className: "infoContainer", children: [_jsxs("div", { className: "infoAndData", children: [!timeLeft.length || timeLeft === 'NaN' ? (_jsx(ShimerPlaceholder, {})) : (_jsx("div", { className: "expires", children: timeLeft && timeLeft === 'Expired' ? (_jsxs("span", { className: "text", children: [_jsx(IoIosWarning, {}), " Expired"] })) : timeLeft && timeLeft.length > 0 ? (_jsxs("span", { className: "expiresInAndTimeLeft", children: [_jsx("div", { className: "info", children: "Expires in:" }), ' ', _jsx("span", { children: timeLeft })] })) : null })), ' '] }), _jsxs("div", { className: "infoAndData", children: [_jsx("div", { className: "info", children: "Times Used:" }), _jsxs("div", { className: "data", children: [timesUsed, "/", maxUses] })] })] }), _jsx("div", { className: "revokeButton", children: _jsx(MyButton, { onClick: () => mutateRevoke({ code: id }), isLoading: isPendingRevoke, children: "Revoke" }) })] })] }));
}
