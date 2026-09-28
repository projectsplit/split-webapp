import { useEffect, useMemo, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
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
import { isUserAuthenticated } from '@/helpers/isUserAuthenticated';
import routes from '@/routes';
import { addNativePushTapListener } from '@/helpers/nativePush';
import { isNativeApp } from '@/helpers/platform';
import DonationPrompt from '../../components/DonationPrompt/DonationPrompt';
import { useRecoverDonationPurchases } from '@/hooks/useRecoverDonationPurchases';

const Protected: React.FC = () => {
  const location = useLocation();
  const { code } = useParams<{ code?: string }>();
  const { data: userInfo } = useGetMe();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Catches a gift Google Play took payment for but whose registration never reached the server.
  // Runs once per app start, and needs an account to attribute anything to.
  useRecoverDonationPurchases(Boolean(userInfo));

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

  // The native app has no service worker to relay through, so the tap on the system notification is
  // the only signal that a push happened. Registered once for the lifetime of the screen because a
  // tap can launch the app from cold and the delivery is only replayed to listeners already present.
  useEffect(() => {
    if (!isNativeApp()) return;

    addNativePushTapListener((url) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['getMe'] });

      // Server-sent urls are paths within this app. Anything absolute would navigate the WebView
      // off our own origin with no way back, so only in-app paths are followed.
      if (url.startsWith('/')) navigate(url);
    });
  }, [queryClient, navigate]);

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

  const excludeTopMenu = useShouldExcludeTopMenu([
    routes.ANALYTICS,
    routes.BUDGET,
    routes.RECURRING_EXPENSES,
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
    <StyledProtected>
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
      {/* Mounted here rather than in App because it needs a signed-in account: the prompt asks the
          server whether this person is due to be asked at all. */}
      <DonationPrompt menu={menu} hasOverlay={Boolean(code)} />
    </StyledProtected>
  ) : (
    <Navigate
      to={`${routes.AUTH}?redirect=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default Protected;

const useShouldExcludeTopMenu = (excludeRoutes: string[]): boolean => {
  const location = useLocation();
  return excludeRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
};
