import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '@/routes';
import { usePlus } from '@/hooks/usePlus';
import MyButton from '../MyButton/MyButton';
import PlusBadge from './PlusBadge';
import { openPlusInfo } from './plusMenu';
import { PlusLockCard, StyledPlusGate } from './PlusGate.styled';

/**
 * A whole screen that belongs to Plus.
 *
 * For anyone who has Plus, in whatever way, this is not there at all. For an account whose free
 * days are over, the screen is still drawn, blurred and out of reach, under a card that says what
 * it is part of and where the plans are. Drawing it is deliberate: someone who built a budget
 * during their free days should see that it has been kept, not find an empty page where it was.
 *
 * The screens this wraps bring their own back button, which is out of reach with the rest, so the
 * card carries one.
 */

export type PlusFeature = 'budgeting' | 'analytics';

const COPY: Record<PlusFeature, { title: string; kept: string }> = {
  budgeting: {
    title: 'Budgeting is part of Buqs Plus',
    kept: 'Your budgets are kept, and carry on from here when you subscribe.',
  },
  analytics: {
    title: 'Analytics is part of Buqs Plus',
    kept: 'Your spending history is kept, and the trends are back when you subscribe.',
  },
};

interface PlusGateProps {
  feature: PlusFeature;
  children: ReactNode;
}

export default function PlusGate({ feature, children }: PlusGateProps) {
  const { isLocked } = usePlus();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isLocked) return <>{children}</>;

  const { title, kept } = COPY[feature];

  const goBack = () => {
    // The first page of a visit has nowhere to go back to: this address was opened directly.
    if (location.key === 'default') navigate(routes.ROOT, { replace: true });
    else navigate(-1);
  };

  return (
    <StyledPlusGate>
      <div className="behind" inert aria-hidden="true">
        {children}
      </div>

      <PlusLockCard role="dialog" aria-modal="true" aria-label={title}>
        <div className="lockup">
          <span className="brand">Buqs</span>
          <PlusBadge size="md" always />
        </div>

        <h2 className="title">{title}</h2>
        <p className="body">Your free Plus days have ended. {kept}</p>

        <MyButton variant="primary" onClick={openPlusInfo}>
          See plans
        </MyButton>

        <button type="button" className="back" onClick={goBack}>
          Back
        </button>
      </PlusLockCard>
    </StyledPlusGate>
  );
}
