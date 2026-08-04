import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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

const Protected: React.FC = () => {
  const location = useLocation();
  const { code } = useParams<{ code?: string }>();
  const { data: userInfo } = useGetMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    prewarmRoutes();
  }, []);

  const hasSyncedPush = useRef(false);

  // Subscriptions belong to a device, not an account, and browsers rotate endpoints on their own.
  // Re-registering once per load is what makes a second device — or a rotated endpoint — reachable.
  //
  // Deliberately keyed off the first userInfo rather than the enabled flag: the settings toggle
  // subscribes by itself, and its optimistic cache write would otherwise flip that flag mid-toggle
  // and race a second subscribe against the first, leaving two rows for one endpoint and every
  // notification arriving twice.
  useEffect(() => {
    if (!userInfo || hasSyncedPush.current) return;

    hasSyncedPush.current = true;

    if (userInfo.pushNotificationsEnabled) {
      syncPushSubscription();
    }
  }, [userInfo]);

  // The service worker gets every push whether or not a tab is focused, so it relays one message
  // and the bell and feed refresh in place. This is the live path; useGetMe's poll is only the
  // fallback for people who never enabled push.
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

  const excludeTopMenu = shouldExcludeTopMenu([
    '/analytics',
    '/budget',
    '/shared/generatecode',
  ]);

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
      <Outlet
        context={{
          userInfo,
          topMenuTitle,
          openGroupOptionsMenu,
          activeGroupCatAsState,
          groupIsArchived,
          confirmUnarchiveMenu,
        }}
      />
      {code && <JoinOverlay />}
      <MenuAnimationBackground menu={menu} />
      <NotificationsMenuAnimation
        menu={menu}
        hasNewerNotifications={hasNewerNotifications || false}
        userInfo={userInfo}
      />
      <SettingsMenuAnimation menu={menu} userInfo={userInfo} />
      {/* <ConfirmUnArchiveGroupAnimation  /> */}
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

const shouldExcludeTopMenu = (excludeRoutes: string[]): boolean => {
  const location = useLocation();
  return excludeRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
};
