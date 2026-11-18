import { PlusMembership } from '@/types';
import { isNativeApp } from '@/helpers/platform';
import { openSubscriptionManagement } from '@/helpers/playBilling';
import {
  isAnnualRenewalDue,
  membershipStatusText,
  planName,
  renewalPriceText,
} from '@/helpers/plusPlans';
import { StyledPlusMembership } from './PlusPlans.styled';

/**
 * The plan a member is on, what happens to it next, and the way out.
 *
 * Google Play owns the subscription, so its own screen is the only place it can be changed or
 * stopped. The door to that screen sits right under the renewal date for the same reason it does
 * under a monthly gift: a recurring charge with no visible way out is the thing that makes people
 * resent one. An annual plan that renews within the month, and a payment Play could not take, both
 * light the card up, because those are the two moments a member needs to read it.
 */

/** Google's own page for a signed-in account's subscriptions, for a member reading this on the web. */
const PLAY_SUBSCRIPTIONS_URL =
  'https://play.google.com/store/account/subscriptions';

interface PlusMembershipCardProps {
  membership: PlusMembership;
}

export default function PlusMembershipCard({
  membership,
}: PlusMembershipCardProps) {
  // The price of the next renewal, so there is none to show once renewal is off.
  const price = membership.autoRenewing ? renewalPriceText(membership) : null;
  const needsAttention =
    membership.inGracePeriod || isAnnualRenewalDue(membership);

  const manageLabel = membership.autoRenewing
    ? 'Manage or cancel in Google Play'
    : 'Manage in Google Play';

  return (
    <StyledPlusMembership $notice={needsAttention}>
      <div className="planRow">
        <span className="planName">{planName(membership.plan)}</span>
        {price && <span className="planPrice">{price}</span>}
      </div>

      <p className="status">{membershipStatusText(membership)}</p>

      {isNativeApp() ? (
        <button
          type="button"
          className="manage"
          onClick={() => void openSubscriptionManagement()}
        >
          {manageLabel}
        </button>
      ) : (
        <a
          className="manage"
          href={PLAY_SUBSCRIPTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {manageLabel}
        </a>
      )}
    </StyledPlusMembership>
  );
}
