import { useEffect, useMemo, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import { StyledProtected } from './Protected.styled';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import NotificationsMenuAnimation from '../../components/Animations/NotificationsMenuAnimation';
import SettingsMenuAnimation from '../../components/Animations/SettingsMenuAnimation';
import TopMenu from '../../components/Menus/TopMenu/TopMenu';
import { JoinOverlay } from '../Join/JoinOverlay';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { prewarmRoutes } from '@/lazyRoutes';
import { syncPushSubscription } from '@/helpers/pushNotifications';

const Protected: React.FC = () => {
  const location = useLocation();
  const { code } = useParams<{ code?: string }>();
  const { data: userInfo } = useGetMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    prewarmRoutes();
  }, []);

  const hasSyncedPush = useRef(false);

  useEffect(() => {
    if (!userInfo || hasSyncedPush.current) return;

    hasSyncedPush.current = true;

    if (userInfo.pushNotificationsEnabled) {
      syncPushSubscription();
    }
  }, [userInfo]);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'notification-received') return;

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () =>
      navigator.serviceWorker.removeEventListener('message', handleMessage);
  }, [queryClient]);

  const groupIsArchived = useSignal<boolean>(false);

  const hasNewerNotifications = userInfo?.hasNewerNotifications;

  const topMenuTitle = useSignal<string>('');
  const menu = useSignal<string | null>(null);
  const openGroupOptionsMenu = useSignal<boolean>(false);
  const activeGroupCatAsState = useSignal<string>('Active');
  const confirmUnarchiveMenu = useSignal<string | null>(null);

  const excludeTopMenu = useShouldExcludeTopMenu([
    '/analytics',
    '/budget',
    '/recurring-expenses',
    '/shared/generatecode',
  ]);

  const outletContext = useMemo(
    () => ({
      userInfo,
      topMenuTitle,
      openGroupOptionsMenu,
      activeGroupCatAsState,
      groupIsArchived,
      confirmUnarchiveMenu,
    }),
    [
      userInfo,
      topMenuTitle,
      openGroupOptionsMenu,
      activeGroupCatAsState,
      groupIsArchived,
      confirmUnarchiveMenu,
    ]
  );

  return isUserAuthenticated() ? (
    <StyledProtected $shouldStyleBorder={groupIsArchived.value}>
      {!excludeTopMenu && (
        <TopMenu
          title={topMenuTitle.value}
          menu={menu}
          username={userInfo?.username}
          hasNewerNotifications={hasNewerNotifications || false}
          openGroupOptionsMenu={openGroupOptionsMenu}
          groupIsArchived={groupIsArchived.value}
          confirmUnarchiveMenu={confirmUnarchiveMenu}
        />
      )}
      <Outlet context={outletContext} />
      {code && <JoinOverlay />}
      <MenuAnimationBackground menu={menu} />
      <NotificationsMenuAnimation menu={menu} userInfo={userInfo} />
      <SettingsMenuAnimation menu={menu} userInfo={userInfo} />
    </StyledProtected>
  ) : (
    <Navigate
      to={`/welcome?redirect=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default Protected;

const isUserAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

const useShouldExcludeTopMenu = (excludeRoutes: string[]): boolean => {
  const location = useLocation();
  return excludeRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
};
