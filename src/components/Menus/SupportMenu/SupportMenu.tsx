import { useEffect } from 'react';
import { Signal } from '@preact/signals-react';
import { useGetDonationPrompt } from '../../../api/auth/QueryHooks/useGetDonationPrompt';
import { suppressDonationPromptForSession } from '../../../hooks/useDonationPromptTiming';
import DonationForm from '../../DonationPrompt/DonationForm';
import Spinner from '../../Spinner/Spinner';
import { openSubscriptionManagement } from '../../../helpers/playBilling';
import { isNativeApp } from '../../../helpers/platform';
import { StyledSupportMenu } from './SupportMenu.styled';

/**
 * The permanent way in, opened from settings.
 *
 * This is what makes the occasional prompt affordable. Because there is always a door, the prompt
 * can be as rare as it is without that rarity costing anything — someone who dismissed it, or who
 * turned it off for good, can still give whenever they feel like it.
 */

interface SupportMenuProps {
  supportMenu: Signal<string | null>;
  nodeRef: React.MutableRefObject<null>;
}

export default function SupportMenu({ supportMenu, nodeRef }: SupportMenuProps) {
  const { data: info, isPending } = useGetDonationPrompt(true);

  // Opening this is someone deciding for themselves, so the app stops asking for the rest of the
  // session. Only closes the door on the automatic prompt — this menu stays reachable.
  useEffect(() => suppressDonationPromptForSession(), []);

  return (
    <StyledSupportMenu ref={nodeRef}>
      {isPending && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {info && (
        <DonationForm
          info={info}
          headline={
            info.hasActiveMonthly
              ? 'You already give every month'
              : info.hasDonated
                ? 'Thank you for giving before'
                : 'Help keep Buqs running'
          }
          subhead={
            info.hasActiveMonthly
              ? 'Your monthly contribution is covering part of the running costs. You can add a one-off on top if you want to.'
              : 'Buqs is free and always will be. Contributions go towards the server it runs on, nothing else.'
          }
        />
      )}

      {/* Google Play owns the subscription, so its own screen is the only place a monthly gift can
          be changed or stopped. Offered here rather than left to be hunted for in the Play Store —
          a recurring charge with no visible way out is the thing that makes people resent one. */}
      {info?.hasActiveMonthly && isNativeApp() && (
        <button
          type="button"
          className="manage"
          onClick={() => void openSubscriptionManagement()}
        >
          Manage or cancel in Google Play
        </button>
      )}

      <button
        type="button"
        className="close"
        onClick={() => (supportMenu.value = null)}
      >
        Close
      </button>
    </StyledSupportMenu>
  );
}
