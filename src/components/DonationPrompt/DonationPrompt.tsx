import { useEffect, useState } from 'react';
import { Signal } from '@preact/signals-react';
import { useLocation } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useGetDonationPrompt } from '../../api/auth/QueryHooks/useGetDonationPrompt';
import { useRecordDonationPromptShown } from '../../api/auth/CommandHooks/useRecordDonationPromptShown';
import { useDismissDonationPrompt } from '../../api/auth/CommandHooks/useDismissDonationPrompt';
import { useDonationPromptTiming } from '../../hooks/useDonationPromptTiming';
import { isNativeApp } from '@/helpers/platform';
import { useBackHandler } from '@/hooks/useBackHandler';
import DonationForm from './DonationForm';
import {
  Backdrop,
  Card,
  CloseRow,
  DismissButton,
  DismissRow,
} from './DonationPrompt.styled';

/**
 * The occasional ask.
 *
 * Whether this person is ever asked is the server's call and is measured in months; this component
 * only chooses a moment inside the session and takes no for an answer. Closing it any way at all —
 * the X, the backdrop, Escape, "Not now" — counts as no and starts the next cooldown, and "Don't
 * ask again" ends it permanently.
 */

/**
 * Routes where something is being done rather than looked at. Interrupting a half-finished budget
 * or a join link with a request for money is the exact behaviour this is trying not to have.
 */
const FLOW_ROUTES = ['/budget/create', '/shared/generatecode', '/j/'];

interface DonationPromptProps {
  /** The top menu's open panel. Any open menu holds the prompt back until it is closed. */
  menu: Signal<string | null>;
  /** True while the join overlay is up. */
  hasOverlay: boolean;
}

export default function DonationPrompt({
  menu,
  hasOverlay,
}: DonationPromptProps) {
  const location = useLocation();

  // Latches once a gift is recorded, so the form's thank-you is not sitting above two buttons
  // offering to stop the asking. Nothing is reported to the server: giving already set a year-long
  // cooldown, and the ask itself was counted when it reached the screen.
  const [hasGiven, setHasGiven] = useState(false);

  const { data: info } = useGetDonationPrompt(true);
  const { mutate: recordShown } = useRecordDonationPromptShown();
  const { mutate: dismiss } = useDismissDonationPrompt();

  const isMidFlow = FLOW_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  const { isOpen, close } = useDonationPromptTiming({
    // Native only. Contributions go through Google Play, which the web build has no access to, so
    // on the web this would interrupt someone with an ask they could not act on even if they wanted
    // to. The settings entry stays reachable there and explains where it can be done.
    enabled: Boolean(info?.isAvailable && info?.shouldAsk) && isNativeApp(),
    blocked: Boolean(menu.value) || hasOverlay || isMidFlow,
  });

  const handleDismiss = (optOut: boolean) => {
    // Closed first, then reported. Nothing about saying no should wait on the network.
    close();

    // Someone who has just given is closing a thank-you, not declining. The backdrop, the X and
    // Escape all land here, so the distinction has to be drawn at the bottom rather than per button.
    if (!hasGiven) dismiss(optOut);
  };

  // The ask is counted when it reaches the screen, not when eligibility was fetched — that fetch
  // happens on every load and usually ends in nothing being shown.
  useEffect(() => {
    if (isOpen) recordShown();
  }, [isOpen, recordShown]);

  // Its own backdrop rather than the shared MenuAnimationBackground, so back has to be told about
  // this one directly. Same meaning as the X and Escape: closing counts as "not now".
  useBackHandler(isOpen, () => handleDismiss(false));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      handleDismiss(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
    // handleDismiss is redefined every render and would re-bind the listener each time; the rule it
    // applies is captured by the two values it actually reads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, close, dismiss, hasGiven]);

  if (!isOpen || !info) {
    return null;
  }

  return (
    <Backdrop
      onClick={() => handleDismiss(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Support Buqs"
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <CloseRow>
          <IoClose className="closeButton" onClick={() => handleDismiss(false)} />
        </CloseRow>

        <DonationForm
          info={info}
          headline="Buqs runs on a server someone pays for"
          subhead="That someone is currently me. If Buqs has been useful to you, a one-off contribution covers a slice of the bill and keeps it running for everyone."
          onGiven={() => setHasGiven(true)}
        />

        {!hasGiven && (
          <DismissRow>
            <DismissButton type="button" onClick={() => handleDismiss(false)}>
              Not now
            </DismissButton>
            <DismissButton type="button" onClick={() => handleDismiss(true)}>
              Don't ask again
            </DismissButton>
          </DismissRow>
        )}
      </Card>
    </Backdrop>
  );
}
