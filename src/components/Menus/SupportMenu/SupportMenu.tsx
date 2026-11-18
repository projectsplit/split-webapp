import { ReactNode, useEffect } from 'react';
import { useGetDonationPrompt } from '../../../api/auth/QueryHooks/useGetDonationPrompt';
import { suppressDonationPromptForSession } from '../../../hooks/useDonationPromptTiming';
import DonationForm from '../../DonationPrompt/DonationForm';
import Spinner from '../../Spinner/Spinner';
import { openSubscriptionManagement } from '../../../helpers/playBilling';
import { isNativeApp } from '../../../helpers/platform';
import { StyledSupportMenu } from './SupportMenu.styled';
import { openPlusInfo } from '../../Plus/plusMenu';

/**
 * The permanent way in, opened from the Support Buqs heart on the home page or from Settings.
 *
 * This is what makes the occasional prompt affordable. Because there is always a door, the prompt
 * can be as rare as it is without that rarity costing anything — someone who dismissed it, or who
 * turned it off for good, can still give whenever they feel like it.
 *
 * The occasional prompt shows this same sheet, so being asked and choosing to give look the same.
 * It only swaps the Close button for its own two ways out.
 */

interface SupportMenuProps {
  nodeRef?: React.MutableRefObject<null>;
  /** Closes the sheet. Also called on the way to the Plus sheet. */
  onClose: () => void;
  /** Takes the place of the Close button. */
  footer?: ReactNode;
  /** Called once a gift has actually been recorded. */
  onGiven?: () => void;
  className?: string;
}

export default function SupportMenu({
  nodeRef,
  onClose,
  footer,
  onGiven,
  className,
}: SupportMenuProps) {
  const { data: info, isPending } = useGetDonationPrompt(true);

  // Opening this is someone deciding for themselves, so the app stops asking for the rest of the
  // session. Only closes the door on the automatic prompt — this menu stays reachable. When the
  // prompt is the one showing this, the session's one ask is already spent and this changes nothing.
  useEffect(() => suppressDonationPromptForSession(), []);

  return (
    <StyledSupportMenu ref={nodeRef} className={className}>
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
              : 'Buqs is free and has no ads. Tips help cover the servers.'
          }
          onGiven={onGiven}
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

      {/* Closes this sheet first: two cards stacked with no dimming between them read as a mistake. */}
      <button
        type="button"
        className="about"
        onClick={() => {
          onClose();
          openPlusInfo();
        }}
      >
        What is Buqs Plus?
      </button>

      {footer ?? (
        <button type="button" className="close" onClick={onClose}>
          Close
        </button>
      )}
    </StyledSupportMenu>
  );
}
