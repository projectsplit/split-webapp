import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledConnectableUserItem } from './ConnectableUserItem.styled';
/**
 * A user row in the non-group pickers. Users you are not connected with
 * cannot be selected directly: they show a Request / Requested / Accept chip.
 */
export default React.memo(function ConnectableUserItem({ name, status, onSelect, onRequest, onAccept, }) {
    const handleRowClick = (e) => {
        if (status === 'connected')
            onSelect(e);
        else if (status === 'none')
            onRequest(e);
        else if (status === 'pending_received')
            onAccept(e);
    };
    return (_jsx(StyledConnectableUserItem, { children: _jsxs("div", { className: "top-row", onClick: handleRowClick, children: [_jsx("div", { className: "name", children: name }), status === 'none' && _jsx("div", { className: "chip request", children: "Request" }), status === 'pending_sent' && (_jsx("div", { className: "chip pending", children: "Requested" })), status === 'pending_received' && (_jsx("div", { className: "chip accept", children: "Accept" }))] }) }));
});
