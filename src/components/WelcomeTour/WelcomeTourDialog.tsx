import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import MyButton from '../MyButton/MyButton';
import PlusBadge from '../Plus/PlusBadge';
import { isAndroidApp } from '@/helpers/platform';
import {
  PaymentCapture,
  turnOnPaymentCapture,
} from '@/helpers/paymentCapture/paymentCapture';
import { usePaymentCaptureStatus } from '@/hooks/usePaymentCaptureStatus';
import {
  BudgetScene,
  LedgerScene,
  NotificationScene,
  SharingScene,
  WelcomeScene,
} from './WelcomeScenes';
import { StyledWelcomeTourDialog } from './WelcomeTourDialog.styled';

type Props = {
  nodeRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

type Slide = {
  key: string;
  scene: (active: boolean) => ReactNode;
  title: ReactNode;
  body: ReactNode;
  note?: ReactNode;
};

const SLIDES: Slide[] = [
  {
    key: 'welcome',
    scene: (active) => <WelcomeScene active={active} />,
    title: 'Welcome to Buqs',
    body: 'Your expense and budget manager. Track what you spend, share costs with the people you spend with, and stay on budget.',
  },
  {
    key: 'ledger',
    scene: (active) => <LedgerScene active={active} />,
    title: 'Everything you spend, in one place',
    body: 'Your personal ledger keeps the expenses that are yours alone and your share of everything you split, so it shows what you really spent.',
  },
  {
    key: 'sharing',
    scene: (active) => <SharingScene active={active} />,
    title: 'Share costs without the maths',
    body: "Make a group for anything ongoing, like a flat or a trip, or a quick split for a one-off with someone you're connected to. Buqs keeps count of who owes whom.",
  },
  {
    key: 'budgets',
    scene: (active) => <BudgetScene active={active} />,
    title: (
      <>
        Stay on budget <PlusBadge />
      </>
    ),
    body: "Set a budget for a week, a month or any period, and see what's left as you spend. Analytics show where the money goes.",
    note: 'Budgets and analytics are Plus features, open to everyone while Buqs is new.',
  },
];

// Offered last, and only in the Android app: nowhere else can Buqs read notifications.
const NOTIFICATIONS: Slide = {
  key: 'notifications',
  scene: (active) => <NotificationScene active={active} />,
  title: 'Add payments without typing',
  body: 'When your bank or payment app tells you about a payment, Buqs keeps it on this phone and offers it as an expense the next time you open the app. You pick the ones to add, and nothing leaves your phone until you do.',
  note: 'Android will ask to let Buqs read notifications, and warns that this means all of them. Buqs never receives chats: it keeps only payments, from apps such as Google Wallet and Revolut and any others you choose in Settings.',
};

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Someone tapping Next through the tour can tap once more as the last slide arrives, and the
// button under their finger is then Turn on or Not now. The last slide's buttons ignore taps for
// this long after it arrives.
const SETTLE_MS = 600;

/**
 * What Buqs does, one idea per slide, swiped through or stepped with Next. In the Android app the
 * last slide offers payments from notifications, says what turning them on means first, and takes
 * the person to Android's switch for Buqs, the one step no app can take for them.
 */
export default function WelcomeTourDialog({ nodeRef, onClose }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // A slide's picture rises in the first time the slide is reached, and stays from then on rather
  // than vanishing while the slide is swiped half away.
  const [reached, setReached] = useState<ReadonlySet<number>>(
    () => new Set([0])
  );

  const slides = isAndroidApp() ? [...SLIDES, NOTIFICATIONS] : SLIDES;
  const isLast = index === slides.length - 1;

  const { status, refresh } = usePaymentCaptureStatus();
  const [isBusy, setIsBusy] = useState(false);
  const busy = useRef(false);
  const [captureError, setCaptureError] = useState('');
  const lastArrivedAt = useRef(0);

  useEffect(() => {
    if (isLast) lastArrivedAt.current = Date.now();
  }, [isLast]);

  // Whatever went wrong before is past once Android lets Buqs read notifications.
  useEffect(() => {
    if (status?.enabled && status.access) setCaptureError('');
  }, [status]);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const target = Math.max(0, Math.min(slides.length - 1, next));
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  // The slide in view, from the scroll position, whether it got there by a swipe or by Next.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex(next);
    setReached((current) =>
      current.has(next) ? current : new Set(current).add(next)
    );
  };

  useEffect(() => {
    nodeRef.current?.focus();
  }, [nodeRef]);

  // The buttons under the slides change on the last one, and focus would go with the one it was on.
  useEffect(() => {
    if (document.activeElement === document.body) nodeRef.current?.focus();
  }, [isLast, nodeRef]);

  // On the window rather than the dialog, so the keys work wherever focus has gone.
  const latest = useRef({ index, goTo, onClose });
  latest.current = { index, goTo, onClose };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { index, goTo, onClose } = latest.current;

      if (event.key === 'ArrowRight') goTo(index + 1);
      else if (event.key === 'ArrowLeft') goTo(index - 1);
      else if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasSettled = () => Date.now() - lastArrivedAt.current >= SETTLE_MS;

  const closeAtEnd = () => {
    if (hasSettled()) onClose();
  };

  // One at a time: a second tap while Android's settings are opening would open them twice.
  const act = (action: () => Promise<void>) => async () => {
    if (busy.current || !hasSettled()) return;

    busy.current = true;
    setIsBusy(true);
    setCaptureError('');

    try {
      await action();
    } finally {
      busy.current = false;
      setIsBusy(false);
    }
  };

  const openSettings = async () => {
    try {
      await PaymentCapture.openAccessSettings();
    } catch {
      setCaptureError(
        "Android's settings didn't open. Allow notification access for Buqs there, then come back."
      );
    }
  };

  const turnOn = act(async () => {
    try {
      await turnOnPaymentCapture();
      await refresh();
    } catch {
      setCaptureError(
        "Buqs couldn't turn this on. You can try again in Settings."
      );
      return;
    }

    // Collecting is on from here, but nothing arrives until Android allows it. Back in the app,
    // the status is read again and this slide says where things stand.
    const { access } = await PaymentCapture.getStatus().catch(() => ({
      access: false,
    }));
    if (!access) await openSettings();
  });

  const allowAccess = act(openSettings);

  const captureActions = () => {
    if (status?.enabled && status.access) {
      return {
        message:
          "It's on. New payments will be waiting the next time you open Buqs.",
        buttons: (
          <MyButton fontSize="16" onClick={onClose}>
            Done
          </MyButton>
        ),
      };
    }

    if (status?.enabled) {
      return {
        message: "Android isn't letting Buqs read notifications yet.",
        warning: true,
        buttons: (
          <>
            <MyButton variant="secondary" fontSize="16" onClick={closeAtEnd}>
              Not now
            </MyButton>
            <MyButton
              fontSize="16"
              onClick={allowAccess}
              isLoading={isBusy}
              disabled={isBusy}
            >
              Allow access
            </MyButton>
          </>
        ),
      };
    }

    return {
      message: 'You can change this at any time in Settings.',
      buttons: (
        <>
          <MyButton variant="secondary" fontSize="16" onClick={closeAtEnd}>
            Not now
          </MyButton>
          <MyButton
            fontSize="16"
            onClick={turnOn}
            isLoading={isBusy}
            disabled={isBusy}
          >
            Turn on
          </MyButton>
        </>
      ),
    };
  };

  const lastActions =
    slides[slides.length - 1] === NOTIFICATIONS ? captureActions() : null;

  return (
    <StyledWelcomeTourDialog
      ref={nodeRef}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Buqs"
      tabIndex={-1}
    >
      <div className="topBar">
        {!isLast ? (
          <button type="button" className="skip" onClick={onClose}>
            Skip
          </button>
        ) : null}
      </div>

      <div className="track" ref={trackRef} onScroll={handleScroll}>
        {slides.map((slide, position) => (
          <section
            key={slide.key}
            className="slide"
            aria-roledescription="slide"
            aria-label={`${position + 1} of ${slides.length}`}
            aria-hidden={position !== index}
          >
            <div className="stage">{slide.scene(reached.has(position))}</div>
            <div className="text">
              <h2 className="title">{slide.title}</h2>
              <p className="body">{slide.body}</p>
              {slide.note ? <p className="note">{slide.note}</p> : null}
            </div>
          </section>
        ))}
      </div>

      <div className="controls">
        <div className="dots">
          {slides.map((slide, position) => (
            <button
              type="button"
              key={slide.key}
              className={`dot${position === index ? ' on' : ''}`}
              aria-label={`Slide ${position + 1}`}
              aria-current={position === index}
              onClick={() => goTo(position)}
            />
          ))}
        </div>

        {isLast && lastActions ? (
          <>
            <p
              className={`status${lastActions.warning || captureError ? ' warning' : ''}`}
            >
              {captureError || lastActions.message}
            </p>
            <div className="actions">{lastActions.buttons}</div>
          </>
        ) : (
          <div className="actions">
            <MyButton
              fontSize="16"
              onClick={isLast ? closeAtEnd : () => goTo(index + 1)}
            >
              {isLast ? 'Get started' : 'Next'}
            </MyButton>
          </div>
        )}
      </div>
    </StyledWelcomeTourDialog>
  );
}
