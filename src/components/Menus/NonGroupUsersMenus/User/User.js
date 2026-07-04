import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledUser } from './User.styled';
import { FaCheck } from 'react-icons/fa';
export default function User({ name, onClick, userId, nonGroupTransferMenu, currentUserId, }) {
    const selectedUserId = nonGroupTransferMenu.value.attribute === 'sender'
        ? nonGroupTransferMenu.value.senderId
        : nonGroupTransferMenu.value.receiverId;
    return (_jsxs(StyledUser, { "$isSelected": userId === selectedUserId, children: [' ', _jsxs("div", { className: "nameAndTick", onClick: onClick, children: [_jsx("div", { className: "name", children: userId === currentUserId ? 'You' : name }), userId === selectedUserId ? (_jsx(FaCheck, { className: "tick", style: { color: '#9e9e9e' } })) : null] })] }));
}
