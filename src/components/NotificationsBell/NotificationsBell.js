import { jsx as _jsx } from "react/jsx-runtime";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { StyledNotificationsBell } from './NotificationsBell.styled';
export default function NotificationsBell({ onClick }) {
    return (_jsx(StyledNotificationsBell, { onClick: onClick, children: _jsx(IoIosNotificationsOutline, {}) }));
}
