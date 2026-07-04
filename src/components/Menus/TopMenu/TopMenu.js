import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import NotificationsBell from '../../NotificationsBell/NotificationsBell';
import UserOptionsButton from '../../UserOptionsButton/UserOptionsButton';
import { StyledTopMenu } from './TopMenu.styled';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
export default function TopMenu({ title, menu, username, hasNewerNotifications, openGroupOptionsMenu, groupIsArchived, confirmUnarchiveMenu, }) {
    const navigate = useNavigate();
    const [visuallyShowNotification, setVisuallyShowNotification] = useState(true);
    const handleNavigate = (title) => {
        if (title !== '' && title !== 'Shared' && title !== 'Your Expenses') {
            navigate('/shared');
        }
    };
    const isInSharedAndNotInNonGroup = title !== '' &&
        title !== 'Shared' &&
        title !== 'Non Group Transactions' &&
        title !== 'Your Expenses';
    return (_jsxs(StyledTopMenu, { title: title, children: [_jsxs("div", { className: "useOptionsContainer", children: [username ? (_jsx(UserOptionsButton, { username: username, onClick: () => (menu.value = 'settings') })) : null, isInSharedAndNotInNonGroup ? (_jsx("div", { className: "titleStripe", children: _jsx("div", { className: "title", onClick: () => handleNavigate(title), style: {
                                cursor: title !== 'Shared' && title !== 'Your Expenses'
                                    ? 'pointer'
                                    : '',
                            }, children: title }) })) : null] }), !isInSharedAndNotInNonGroup ? (_jsx("div", { className: "titleStripe", children: _jsx("div", { className: "title", onClick: () => handleNavigate(title), style: {
                        cursor: title !== 'Shared' && title !== 'Your Expenses'
                            ? 'pointer'
                            : '',
                    }, children: title }) })) : null, _jsxs("div", { className: "bellAndCog", children: [' ', isInSharedAndNotInNonGroup ? (groupIsArchived ? (_jsxs("div", { className: "cogContainer", onClick: () => (confirmUnarchiveMenu.value = 'unarchiveGroup'), children: [' ', _jsx(IonIcon, { name: "arrow-undo-outline", className: "arrow" })] })) : (_jsxs("div", { className: "cogContainer", onClick: () => (openGroupOptionsMenu.value = true), children: [' ', _jsx(IonIcon, { name: "settings-outline", className: "cog" })] }))) : null, _jsxs("div", { className: "bellIconAndNumberOfNotifications", onClick: () => {
                            menu.value = 'notifications';
                            setVisuallyShowNotification(false);
                        }, children: [username ? _jsx(NotificationsBell, {}) : null, hasNewerNotifications && visuallyShowNotification ? (_jsx("span", { className: "notification" })) : ('')] })] })] }));
}
