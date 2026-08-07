import { useEffect } from 'react';
import { Signal } from '@preact/signals-react';
import { useLocation } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useGetDonationPrompt } from '../../api/auth/QueryHooks/useGetDonationPrompt';
import { useRecordDonationPromptShown } from '../../api/auth/CommandHooks/useRecordDonationPromptShown';
import { useDismissDonationPrompt } from '../../api/auth/CommandHooks/useDismissDonationPrompt';
import { useDonationPromptTiming } from '../../hooks/useDonationPromptTiming';
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

  const { data: info } = useGetDonationPrompt(true);
  const { mutate: recordShown } = useRecordDonationPromptShown();
  const { mutate: dismiss } = useDismissDonationPrompt();

  const isMidFlow = FLOW_ROUTES.some((route) =>
    location.pathname.startsWith(route)
  );

  const { isOpen, close } = useDonationPromptTiming({
    enabled: Boolean(info?.isAvailable && info?.shouldAsk),
    blocked: Boolean(menu.value) || hasOverlay || isMidFlow,
  });

  // The ask is counted when it reaches the screen, not when eligibility was fetched — that fetch
  // happens on every load and usually ends in nothing being shown.
  useEffect(() => {
    if (isOpen) recordShown();
  }, [isOpen, recordShown]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      close();
      dismiss(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, dismiss]);

  if (!isOpen || !info) {
    return null;
  }

  const handleDismiss = (optOut: boolean) => {
    // Closed first, then reported. Nothing about saying no should wait on the network.
    close();
    dismiss(optOut);
  };

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
        />

        <DismissRow>
          <DismissButton type="button" onClick={() => handleDismiss(false)}>
            Not now
          </DismissButton>
          <DismissButton type="button" onClick={() => handleDismiss(true)}>
            Don't ask again
          </DismissButton>
        </DismissRow>
      </Card>
    </Backdrop>
  );
}
