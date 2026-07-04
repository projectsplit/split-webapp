import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { StyledProtected } from './Protected.styled';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import NotificationsMenuAnimation from '../../components/Animations/NotificationsMenuAnimation';
import SettingsMenuAnimation from '../../components/Animations/SettingsMenuAnimation';
import TopMenu from '../../components/Menus/TopMenu/TopMenu';
import { JoinOverlay } from '../Join/JoinOverslay';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { prewarmRoutes } from '@/lazyRoutes';
import { syncPushSubscription } from '@/helpers/pushNotifications';
const Protected = () => {
    const location = useLocation();
    const { code } = useParams();
    const { data: userInfo } = useGetMe();
    useEffect(() => {
        prewarmRoutes();
    }, []);
    // Push endpoints can rotate, so re-register this device on app start
    useEffect(() => {
        if (userInfo?.pushNotificationsEnabled) {
            syncPushSubscription();
        }
    }, [userInfo?.pushNotificationsEnabled]);
    const groupIsArchived = useSignal(false);
    const hasNewerNotifications = userInfo?.hasNewerNotifications;
    const topMenuTitle = useSignal('');
    const menu = useSignal(null);
    const openGroupOptionsMenu = useSignal(false);
    const activeGroupCatAsState = useSignal('Active');
    const confirmUnarchiveMenu = useSignal(null);
    const excludeTopMenu = shouldExcludeTopMenu([
        '/analytics',
        '/budget',
        '/shared/generatecode',
    ]);
    return isUserAuthenticated() ? (_jsxs(StyledProtected, { "$shouldStyleBorder": groupIsArchived.value, children: [!excludeTopMenu && (_jsx(TopMenu, { title: topMenuTitle.value, menu: menu, username: userInfo?.username, hasNewerNotifications: hasNewerNotifications || false, openGroupOptionsMenu: openGroupOptionsMenu, groupIsArchived: groupIsArchived.value, confirmUnarchiveMenu: confirmUnarchiveMenu })), _jsx(Outlet, { context: {
                    userInfo,
                    topMenuTitle,
                    openGroupOptionsMenu,
                    activeGroupCatAsState,
                    groupIsArchived,
                    confirmUnarchiveMenu,
                } }), code && _jsx(JoinOverlay, {}), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(NotificationsMenuAnimation, { menu: menu, hasNewerNotifications: hasNewerNotifications || false, userInfo: userInfo }), _jsx(SettingsMenuAnimation, { menu: menu, userInfo: userInfo })] })) : (_jsx(Navigate, { to: `/welcome?redirect=${encodeURIComponent(location.pathname)}`, replace: true }));
};
export default Protected;
const isUserAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};
const shouldExcludeTopMenu = (excludeRoutes) => {
    const location = useLocation();
    return excludeRoutes.some((route) => location.pathname === route || location.pathname.startsWith(`${route}/`));
};
