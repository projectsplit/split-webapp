import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StyledShareGroup } from './ShareGroup.styled';
import Spinner from '../../../components/Spinner/Spinner';
import { IoCopy } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import logo from '../../../styles/logo/logoRounded.png';
import MyButton from '../../../components/MyButton/MyButton';
import { copyToClipboard } from '../../../helpers/copyToClipboars';
import { useQueryClient } from '@tanstack/react-query';
import { IoIosWarning } from 'react-icons/io';
import ShimerPlaceholder from '../ShimerPlaceholder/ShimerPlaceholder';
import config from '../../../config';
export default function ShareGroup({ groupName, isPending, qrRef, invitationCode, mutate, groupId, setInvitationCode, expires, }) {
    const pageSize = 10;
    const queryClient = useQueryClient();
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
    useEffect(() => {
        if (invitationCode && qrRef.current) {
            const qrCode = new QRCodeStyling({
                width: 250,
                height: 250,
                data: `${config.clientUrl}/j/${invitationCode}`,
                dotsOptions: {
                    color: '#000000',
                    type: 'rounded',
                },
                cornersSquareOptions: {
                    type: 'extra-rounded',
                },
                backgroundOptions: {
                    color: '#c5a1ff',
                    round: 0.1,
                },
                image: logo,
                imageOptions: {
                    crossOrigin: 'anonymous',
                    margin: 10,
                    imageSize: 0.4,
                },
            });
            qrRef.current.innerHTML = '';
            qrCode.append(qrRef.current);
            return () => {
                if (qrRef.current) {
                    qrRef.current.innerHTML = '';
                }
            };
        }
    }, [invitationCode, isPending]);
    return (_jsxs(StyledShareGroup, { children: [invitationCode && !isPending ? (_jsxs("div", { children: [groupName.length > 0 ? (_jsxs("div", { className: "promptMessage", children: ["Scan this QR code with another device to join", ' ', _jsx("strong", { className: "groupName", children: groupName })] })) : (_jsx("div", { className: "promptMessage", children: "Scan this QR code with another device" })), _jsx("div", { className: "qrCodeContainer", children: _jsx("div", { className: "qrCode", ref: qrRef }) })] })) : isPending ? (_jsx("div", { className: "qrCodeContainer", children: _jsx(Spinner, {}) })) : (_jsx("div", { className: "text", children: "Invitation code does not exist" })), _jsxs("div", { className: "codentext", children: [invitationCode && !isPending ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text", children: "Alternatively, share this code:" }), _jsxs("div", { className: "code", children: [_jsx("strong", { children: invitationCode }), _jsx("div", { className: "copy", onClick: () => copyToClipboard(invitationCode, `${config.clientUrl}/j/`), children: _jsx(IoCopy, {}) })] }), _jsx("div", { className: "expires", children: !timeLeft.length || timeLeft === 'NaN' ? (_jsx(ShimerPlaceholder, {})) : timeLeft && timeLeft === 'Expired' ? (_jsxs("span", { className: "text", children: [_jsx(IoIosWarning, {}), " Expired"] })) : timeLeft && timeLeft.length > 0 ? (_jsxs("span", { children: ["Expires in: ", timeLeft] })) : null })] })) : null, _jsx("div", { className: "buttonContainer", children: _jsx(MyButton, { onClick: () => mutate({ groupId: groupId }, {
                                onSuccess: (code) => {
                                    queryClient.invalidateQueries({
                                        queryKey: ['getGroupJoinCodes', groupId, pageSize],
                                    });
                                    setInvitationCode(code);
                                },
                            }), children: "Generate New Code" }) })] })] }));
}
