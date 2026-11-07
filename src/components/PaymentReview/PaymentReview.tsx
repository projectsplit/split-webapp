import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import {
  isPaymentCaptureAvailable,
  PaymentCapture,
} from '@/helpers/paymentCapture/paymentCapture';
import {
  loadPaymentReview,
  paymentReviewItems,
} from '@/helpers/paymentCapture/paymentReview';
import PaymentReviewDialog from './PaymentReviewDialog';

type Props = {
  menu: Signal<string | null>;
  /** Something else already has the screen, such as a group invitation being answered. */
  hasOverlay: boolean;
};

/** Captures the person has already been shown since the app started, so each opens the list once. */
const offered = new Set<string>();

const offerAll = () =>
  paymentReviewItems
    .peek()
    .forEach((item) => item.captureIds.forEach((id) => offered.add(id)));

/**
 * Puts the payments collected from notifications in front of the person when they open the app:
 * read on start and whenever the app comes back to the front, and opened by itself when something
 * new has arrived since they last saw the list. A payment that arrives while the app is in use only
 * updates the count under the title, rather than taking over the screen mid-task.
 *
 * Renders nothing outside the Android app.
 */
export default function PaymentReview({ menu, hasOverlay }: Props) {
  const nodeRef = useRef(null);
  const { data: userInfo } = useGetMe();
  const homeCurrency = userInfo?.currency;
  const timeZoneId =
    userInfo?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  const isOpen = menu.value === 'paymentReview';

  useCloseOnBack(isOpen, () => (menu.value = null));

  useEffect(() => {
    if (isOpen) offerAll();
  }, [isOpen]);

  // Read through a ref by listeners registered once, which would otherwise keep the values they
  // started with.
  const latest = useRef({ hasOverlay });
  latest.current = { hasOverlay };

  useEffect(() => {
    if (!homeCurrency) return;

    let stopped = false;
    const handles: PluginListenerHandle[] = [];

    const refresh = async (open: boolean) => {
      await loadPaymentReview(homeCurrency);
      if (stopped || !open) return;

      const hasNew = paymentReviewItems
        .peek()
        .some((item) => item.captureIds.some((id) => !offered.has(id)));

      if (!hasNew || menu.peek() !== null || latest.current.hasOverlay) return;

      offerAll();
      menu.value = 'paymentReview';
    };

    void (async () => {
      if (!(await isPaymentCaptureAvailable()) || stopped) return;

      void refresh(true);

      handles.push(
        await App.addListener('resume', () => void refresh(true)),
        await PaymentCapture.addListener('captured', () => void refresh(false))
      );

      if (stopped) handles.forEach((handle) => void handle.remove());
    })();

    return () => {
      stopped = true;
      handles.forEach((handle) => void handle.remove());
    };
  }, [homeCurrency, menu]);

  return (
    <CSSTransition in={isOpen} timeout={0} unmountOnExit nodeRef={nodeRef}>
      <PaymentReviewDialog menu={menu} timeZoneId={timeZoneId} />
    </CSSTransition>
  );
}
