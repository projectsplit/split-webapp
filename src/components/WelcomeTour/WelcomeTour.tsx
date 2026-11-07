import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import { useLocation } from 'react-router-dom';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import {
  hasSeenWelcomeTour,
  markWelcomeTourSeen,
  WELCOME_FROM_SETTINGS,
  welcomeTourOpen,
} from '@/helpers/welcomeTour';
import routes from '@/routes';
import WelcomeTourDialog from './WelcomeTourDialog';

type Props = {
  menu: Signal<string | null>;
  /** Something else already has the screen, such as a group invitation being answered. */
  hasOverlay: boolean;
};

/**
 * The welcome tour: opened by itself the first time someone signs in on this device, and from
 * Settings whenever they like. On the shared menu signal, so it waits for whatever already has the
 * screen, and the donation prompt and the payments list wait for it in turn.
 *
 * It opens by itself only on the home screen. Someone who arrives from a notification or a link
 * came to do something there, and sees the tour when they first reach home instead.
 */
export default function WelcomeTour({ menu, hasOverlay }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useGetMe();
  const userId = userInfo?.userId;
  const isHome = useLocation().pathname === routes.ROOT;

  const isOpen =
    menu.value === 'welcome' || menu.value === WELCOME_FROM_SETTINGS;
  const isMenuFree = menu.value === null;

  const close = () => {
    menu.value = menu.peek() === WELCOME_FROM_SETTINGS ? 'settings' : null;
  };

  useCloseOnBack(isOpen, close);

  useEffect(() => {
    welcomeTourOpen.value = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!userId || !isHome || !isMenuFree || hasOverlay) return;
    if (hasSeenWelcomeTour(userId)) return;

    markWelcomeTourSeen(userId);
    menu.value = 'welcome';
  }, [userId, isHome, isMenuFree, hasOverlay, menu]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={250}
      classNames="welcome"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <WelcomeTourDialog nodeRef={nodeRef} onClose={close} />
    </CSSTransition>
  );
}
