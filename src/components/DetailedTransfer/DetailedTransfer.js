import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { StyledDetailedTransfer } from './DetailedTransfer.styled';
import MyButton from '../MyButton/MyButton';
import { AiFillDelete } from 'react-icons/ai';
import { useSignal } from '@preact/signals-react';
import { DateOnly, TimeOnly, YearOnly } from '../../helpers/timeHelpers';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { HeadingNode } from '@lexical/rich-text';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import DeleteTransferAnimation from '../Animations/DeleteTransferAnimation';
export default function DetailedTransfer({ selectedTransfer, amount, created, creator, currency, occurred, timeZoneId, userMemberId, members, errorMessage, groupIsArchived, userId, }) {
    const menu = useSignal(null);
    const onError = (error) => {
        console.error(error);
    };
    const theme = {
        text: {
            bold: 'editor-bold',
        },
    };
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode],
    };
    const outlineColor = selectedTransfer.value?.senderId === userMemberId ||
        selectedTransfer.value?.senderId === userId
        ? '#0CA0A0'
        : selectedTransfer.value?.receiverId === userMemberId ||
            selectedTransfer.value?.receiverId === userId
            ? '#D79244'
            : 'rgb(54,54,54)';
    const sender = members.find((x) => x.id === selectedTransfer.value?.senderId);
    const receiver = members.find((x) => x.id === selectedTransfer.value?.receiverId);
    const isUserSender = sender?.id === userMemberId || sender?.id === userId;
    const isUserReceiver = receiver?.id === userMemberId || receiver?.id === userId;
    return (_jsxs(StyledDetailedTransfer, { "$outlineColor": outlineColor, children: [_jsxs("div", { className: "headlineAndClose", children: [_jsx("div", { className: "head" }), _jsx("div", { className: "closeButton", onClick: () => (selectedTransfer.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "total", children: _jsx("strong", { children: displayCurrencyAndAmount(amount.toString(), currency) }) }), _jsxs("div", { className: "transfer", children: [_jsxs("div", { className: "sentFrom", children: [_jsx("span", { children: "Sent from" }), "\u00A0", _jsx("span", { className: "name", children: isUserSender ? 'You' : sender?.name })] }), _jsx("span", { className: "to", children: "to" }), _jsx("div", { className: "sentTo", children: isUserReceiver ? 'You' : receiver?.name }), _jsx("div", { className: "descr", children: selectedTransfer.value?.description
                            ? `“ ${selectedTransfer.value?.description} ”`
                            : '' })] }), !groupIsArchived ? (_jsx("div", { className: "deleteButton", children: _jsx(MyButton, { onClick: () => (menu.value = 'deleteTransfer'), children: _jsxs("div", { className: "buttonChildren", children: [_jsx(AiFillDelete, { className: "icon" }), _jsx("span", { children: "Delete" })] }) }) })) : null, _jsxs("div", { className: "createdBy", children: ["Created by ", members.find((x) => x.id === creator)?.name, ' ', DateOnly(occurred, timeZoneId) === 'Today' ||
                        DateOnly(occurred, timeZoneId) === 'Yesterday'
                        ? DateOnly(created, timeZoneId)
                        : 'on' +
                            ' ' +
                            DateOnly(occurred, timeZoneId) +
                            ' ' +
                            YearOnly(occurred, timeZoneId), ' ', "at ", TimeOnly(created, timeZoneId)] }), _jsxs("div", { className: "date", children: ["Occurred", ' ', DateOnly(occurred, timeZoneId) === 'Today' ||
                        DateOnly(occurred, timeZoneId) === 'Yesterday'
                        ? DateOnly(occurred, timeZoneId)
                        : 'on' +
                            ' ' +
                            DateOnly(occurred, timeZoneId) +
                            ' ' +
                            YearOnly(occurred, timeZoneId), ' ', "at ", TimeOnly(occurred, timeZoneId)] }), _jsx("div", { className: "commentSection", children: _jsx("div", { className: "comments" }) }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(DeleteTransferAnimation, { menu: menu, selectedTransfer: selectedTransfer, errorMessage: errorMessage })] }));
}
