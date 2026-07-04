import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { DateTime } from 'luxon';
import { StyledTransfer } from './Transfer.styled';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { useLongPress } from '../../hooks/useLongPress';
const Transfer = ({ transfer, timeZoneId, onClick, onLongPress, }) => {
    const longPressHandlers = useLongPress(onLongPress ?? (() => { }));
    const outlineColor = transfer.senderName === 'You'
        ? '#0CA0A0'
        : transfer.receiverName === 'You'
            ? '#D79244'
            : 'rgb(54,54,54)';
    return (_jsxs(StyledTransfer, { "$outlineColor": outlineColor, onClick: onClick, ...longPressHandlers, children: [_jsxs("div", { className: "main", children: [_jsx("div", { className: "mainMsg", children: transfer.senderName === 'You' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "msg1", children: [_jsxs("div", { className: "msg", children: [' ', "You sent", ' ', displayCurrencyAndAmount(Math.abs(transfer.amount).toString(), transfer.currency)] }), _jsx("div", { className: "emoji", children: "\uD83D\uDCB8" })] }), _jsxs("div", { className: "msg2", children: ["to ", transfer.receiverName] })] })) : transfer.receiverName === 'You' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "msg1", children: [_jsxs("div", { className: "msg", children: ["You received", ' ', displayCurrencyAndAmount(Math.abs(transfer.amount).toString(), transfer.currency)] }), _jsx("div", { className: "emoji", children: "\uD83E\uDD11" })] }), _jsxs("div", { className: "msg2", children: ["from ", transfer.senderName] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "msg1", style: { color: '#a3a3a3' }, children: [transfer.senderName, " sent", ' ', displayCurrencyAndAmount(Math.abs(transfer.amount).toString(), transfer.currency)] }), _jsxs("div", { className: "msg2", children: ["to ", transfer.receiverName] })] })) }), _jsx("div", { className: "time", children: TimeOnly(transfer.date, timeZoneId) })] }), transfer.description ? (_jsxs("div", { className: "descr", children: ["\u201C ", transfer.description, " \u201D"] })) : null] }));
};
export default Transfer;
const TimeOnly = (eventTimeUtc, timeZone) => {
    const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: 'utc' }).setZone(timeZone);
    return eventDateTime.setZone(timeZone).toFormat('HH:mm');
};
