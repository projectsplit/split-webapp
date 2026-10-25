import { ReactNode } from 'react';
import { BsBarChartFill, BsFillPiggyBankFill } from 'react-icons/bs';
import { IoMdSearch } from 'react-icons/io';
import { MdAutoAwesome, MdLocationOn } from 'react-icons/md';
import PlusBadge from './PlusBadge';
import { closePlusInfo } from './plusMenu';
import { StyledPlusInfoMenu } from './PlusInfoMenu.styled';

/**
 * What Plus is, said once and said the same way everywhere the mark appears.
 *
 * The honest version of a plan to charge later: the features are named now, while they are still
 * free, so that when Plus does start costing money nobody finds a lock on something they thought
 * was simply part of the app. No date, because none is known; a promise of notice instead.
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

export default function PlusInfoMenu({ nodeRef }: PlusInfoMenuProps) {
  return (
    <StyledPlusInfoMenu ref={nodeRef}>
      <div className="lockup">
        <span className="brand">Buqs</span>
        <PlusBadge size="lg" />
      </div>

      <h2 className="headline">Open to everyone while Buqs is new</h2>
      <p className="subhead">
        Budgeting, analytics, search and places are Plus features. For now
        they are included for everyone, with nothing to unlock.
      </p>

      <div className="features">
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

      <p className="footnote">
        Plus will become a paid upgrade later. You will hear about it here
        first, at least 30 days before anything changes. Splitting, groups,
        settling up and the rest of Buqs are free.
      </p>

      <button type="button" className="close" onClick={closePlusInfo}>
        Close
      </button>
    </StyledPlusInfoMenu>
  );
}
