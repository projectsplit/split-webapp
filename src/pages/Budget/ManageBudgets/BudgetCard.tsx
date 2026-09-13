import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { DateTime } from 'luxon';
import { BudgetBars } from '@/components/BudgetBars/BudgetBars';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import { BudgetScope } from '@/types';
import { StyledBudgetCard } from './BudgetCard.styled';

interface BudgetCardProps {
  name: string;
  scope: BudgetScope | undefined;
  targetGroupIds?: string[];
  startDate?: string;
  endDate?: string;
  spent: number;
  goal: number;
  currency: string;
  isActive: boolean;
  pending?: boolean;
  isOn: boolean;
  onToggle: () => void;
  onClick: () => void;
  timeZoneId?: string;
}

export const BudgetCard = ({
  name,
  scope,
  targetGroupIds,
  startDate,
  endDate,
  spent,
  goal,
  currency,
  isActive,
  pending,
  isOn,
  onToggle,
  onClick,
  timeZoneId,
}: BudgetCardProps) => {
  const formatDay = (iso?: string) =>
    iso ? DateTime.fromISO(iso, { zone: timeZoneId }).toFormat('d LLL') : '';

  const scopes = getActiveScopes(scope, targetGroupIds).join(', ');
  const range =
    startDate && endDate ? `${formatDay(startDate)} – ${formatDay(endDate)}` : '';
  const meta = [scopes, range].filter(Boolean).join(' · ');

  return (
    <StyledBudgetCard onClick={onClick}>
      <div className="cardTop">
        <div className="cardIdentity">
          <div className="cardName">{name}</div>
          <div className="cardMeta">{meta}</div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ToggleSwitch isOn={isOn} onToggle={onToggle} />
        </div>
      </div>

      <BudgetBars
        spent={spent}
        cap={goal}
        currency={currency}
        showSpent={isActive}
        pending={pending}
      />
    </StyledBudgetCard>
  );
};
