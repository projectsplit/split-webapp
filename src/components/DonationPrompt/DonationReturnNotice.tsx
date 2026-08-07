import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import MyButton from '../MyButton/MyButton';
import PuppyEyes from './PuppyEyes';
import {
  Backdrop,
  Card,
  CloseRow,
  PuppyFrame,
  StyledDonationForm,
  ThankYou,
} from './DonationPrompt.styled';

/**
 * What Stripe sends people back to. Checkout is a redirect away to Stripe's own page, so the return
 * is a fresh page load carrying nothing but a query parameter.
 *
 * Only ever thanks — it never confirms. The payment is confirmed by a webhook that may not have
 * landed yet, so anything here that claimed the money had arrived would be a guess. Stripe emails
 * the receipt, which is the confirmation that is actually backed by something.
 */

const SUCCESS = 'success';
const CANCELLED = 'cancelled';

export default function DonationReturnNotice() {
  const queryClient = useQueryClient();
  const [outcome, setOutcome] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const donation = params.get('donation');

    if (donation !== SUCCESS && donation !== CANCELLED) return;

    setOutcome(donation);

    // Strip the parameter straight away so a refresh, a shared link or the back button does not
    // replay the message.
    params.delete('donation');
    params.delete('session_id');

    const query = params.toString();

    window.history.replaceState(
      {},
      '',
      window.location.pathname + (query ? `?${query}` : '')
    );

    if (donation === SUCCESS) {
      // The webhook is probably still in flight, so this is a nudge rather than a guarantee — the
      // eligibility answer will be right by the next load either way.
      queryClient.invalidateQueries({ queryKey: ['donationPrompt'] });
    }
  }, [queryClient]);

  if (outcome === null) {
    return null;
  }

  // Backing out of Checkout is an ordinary thing to do and gets no message at all. Following someone
  // who just declined to pay with a popup about it would be the nagging this feature avoids.
  if (outcome === CANCELLED) {
    return null;
  }

  return (
    <Backdrop onClick={() => setOutcome(null)}>
      <Card onClick={(event) => event.stopPropagation()}>
        <CloseRow>
          <IoClose className="closeButton" onClick={() => setOutcome(null)} />
        </CloseRow>

        <StyledDonationForm>
          <PuppyFrame>
            <PuppyEyes />
          </PuppyFrame>

          <ThankYou>
            <div className="title">Thank you</div>
            <div className="body">
              That genuinely helps keep the server running. Stripe will email
              you a receipt.
            </div>
          </ThankYou>

          <MyButton variant="primary" onClick={() => setOutcome(null)}>
            Back to Buqs
          </MyButton>
        </StyledDonationForm>
      </Card>
    </Backdrop>
  );
}
