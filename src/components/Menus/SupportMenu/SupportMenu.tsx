import { Signal } from '@preact/signals-react';
import { useGetDonationPrompt } from '../../../api/auth/QueryHooks/useGetDonationPrompt';
import DonationForm from '../../DonationPrompt/DonationForm';
import Spinner from '../../Spinner/Spinner';
import { openSubscriptionManagement } from '../../../helpers/playBilling';
import { isNativeApp } from '../../../helpers/platform';
import { StyledSupportMenu } from './SupportMenu.styled';

/**
 * The only way to give: opened from the Support Buqs heart on the home page or from Settings. Buqs
 * never asks on its own, so this is always someone choosing to look.
 */

interface SupportMenuProps {
  supportMenu: Signal<string | null>;
  nodeRef: React.MutableRefObject<null>;
}

export default function SupportMenu({ supportMenu, nodeRef }: SupportMenuProps) {
  const { data: info, isPending } = useGetDonationPrompt(true);

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
              : 'We plan to keep Buqs free for as long as we can cover the cost of its servers.'
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
