import { ReactNode } from 'react';
import { BsBarChartFill, BsFillPiggyBankFill } from 'react-icons/bs';
import { IoMdSearch } from 'react-icons/io';
import {
  MdAutoAwesome,
  MdLocationOn,
  MdNotificationsActive,
} from 'react-icons/md';
import PlusBadge from './PlusBadge';
import PlusMembershipCard from './PlusMembershipCard';
import PlusPlans from './PlusPlans';
import PuppyEyes from '../DonationPrompt/PuppyEyes';
import { closePlusInfo } from './plusMenu';
import { StyledPlusInfoMenu } from './PlusInfoMenu.styled';
import { useGetPlusOffer } from '@/api/auth/QueryHooks/useGetPlusOffer';
import { PlusState, usePlus } from '@/hooks/usePlus';
import {
  daysLeftText,
  formatPlusDate,
  trialDaysLeft,
} from '@/helpers/plusPlans';

/**
 * What Plus is, said once and said the same way everywhere the mark appears, and the one place it
 * is bought and looked after.
 *
 * The feature list never changes. What sits above it follows where the account stands:
 *
 * - While Plus is not live, the plain explanation it started as: the features are named while they
 *   are still open to everyone, with a promise of notice before that changes.
 * - In an account's free days, how many are left and what happens after them, with the two plans.
 * - Once those are over, the same two plans and what is and is not affected.
 * - For a subscriber, their plan, its renewal date and the way to Google Play.
 * - For a founding account, that Plus is theirs for life.
 */

interface PlusInfoMenuProps {
  nodeRef: React.MutableRefObject<null>;
}

const Feature = ({
  icon,
  name,
  text,
  upcoming,
}: {
  icon: ReactNode;
  name: string;
  text: string;
  /** Quieter: something that is not here yet. */
  upcoming?: boolean;
}) => (
  <div className={`feature${upcoming ? ' upcoming' : ''}`}>
    <span className="featureIcon">{icon}</span>
    <div className="featureBody">
      <div className="featureName">{name}</div>
      <div className="featureText">{text}</div>
    </div>
  </div>
);

/** What stays free whatever happens to Plus. Said wherever a lock or an end date is mentioned. */
const FREE_FOREVER =
  'Splitting, groups, settling up and the rest of Buqs stay free.';

/** The heading and the paragraph under it, for where this account stands. */
const introFor = (plus: PlusState): { headline: string; subhead: string } => {
  switch (plus.access) {
    case 'subscription':
      return {
        headline: 'You are on Buqs Plus',
        subhead:
          'Thank you for backing Buqs. Everything below is part of your plan.',
      };

    case 'lifetime':
      return {
        headline: 'You have Buqs Plus for life',
        subhead:
          'Thank you for helping to test Buqs. Everything below is yours, free, for as long as Buqs is around.',
      };

    case 'trial': {
      // Present whenever the server says "trial"; the fallback keeps a malformed answer readable.
      const ends = plus.trialEndsAt;

      return {
        // The number first: it is the one thing on this sheet that changes from day to day.
        headline: ends
          ? `${daysLeftText(trialDaysLeft(ends))} of free Plus`
          : 'Plus is free for your first days',
        subhead: `Every new account gets Buqs Plus free${
          ends ? ` until ${formatPlusDate(ends)}` : ''
        }, with no card needed. After that, the features below need a subscription. ${FREE_FOREVER}`,
      };
    }

    case 'none':
      return {
        headline: 'Your free Plus days have ended',
        subhead: `The features below are part of Buqs Plus. Everything you added is kept. ${FREE_FOREVER}`,
      };

    default:
      return {
        headline: 'Open to everyone while Buqs is new',
        subhead:
          'Payments from notifications, budgeting, analytics, search and places are Plus features. For now they are included for everyone, with nothing to unlock.',
      };
  }
};

export default function PlusInfoMenu({ nodeRef }: PlusInfoMenuProps) {
  const plus = usePlus();

  // Asked only for someone who could still subscribe; a member has nothing left to be offered.
  const { data: offer } = useGetPlusOffer(!plus.isMember);

  const { headline, subhead } = introFor(plus);

  const canSubscribe = !plus.isMember && Boolean(offer?.isAvailable);

  return (
    <StyledPlusInfoMenu ref={nodeRef}>
      {/* The puppy from the tip sheet, wherever Plus can be bought: the same face asks here. */}
      {canSubscribe && (
        <div className="puppy">
          <PuppyEyes />
        </div>
      )}

      <div className="lockup">
        <span className="brand">Buqs</span>
        <PlusBadge size="lg" always />
      </div>

      <h2 className="headline">{headline}</h2>
      <p className="subhead">{subhead}</p>

      {plus.subscription && (
        <PlusMembershipCard membership={plus.subscription} />
      )}

      {canSubscribe && offer && (
        <PlusPlans
          offer={offer}
          note={
            plus.access === 'trial'
              ? 'You can subscribe now or when your free days end. Either way, the plan starts on the day you subscribe.'
              : undefined
          }
        />
      )}

      <div className="features">
        <Feature
          icon={<MdNotificationsActive />}
          name="Payments from notifications"
          text="In the Android app, the payments your bank and payment apps tell you about wait in Buqs, ready to add as expenses."
        />
        <Feature
          icon={<BsFillPiggyBankFill />}
          name="Budgeting"
          text="Set a cap for a week, a month, a year or any period, and watch your spending against it."
        />
        <Feature
          icon={<BsBarChartFill />}
          name="Analytics"
          text="Spending trends over time, and what you have lent and borrowed."
        />
        <Feature
          icon={<IoMdSearch />}
          name="Search"
          text="Find any expense or transfer by keyword, person, label or date."
        />
        <Feature
          icon={<MdLocationOn />}
          name="Places"
          text="Pin where an expense happened and see it on the map."
        />
        {/* Deliberately names nothing. A feature that is not built yet is a hope, not a fact, and
            this sheet is meant to hold only facts. */}
        <Feature
          icon={<MdAutoAwesome />}
          name="More to come"
          text="New features will join Plus as they arrive."
          upcoming
        />
      </div>

      {/* The promise of notice belongs to the time before Plus is live. Once it is, every account
          has its own dates, and they are said above. */}
      {plus.access === 'open' && (
        <p className="footnote">
          Plus will become a paid upgrade later. You will hear about it here
          first, at least 30 days before anything changes. Splitting, groups,
          settling up and the rest of Buqs are free.
        </p>
      )}

      <button type="button" className="close" onClick={closePlusInfo}>
        Close
      </button>
    </StyledPlusInfoMenu>
  );
}
