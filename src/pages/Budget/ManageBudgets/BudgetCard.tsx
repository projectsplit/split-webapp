import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';
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
    iso
      ? new Date(iso).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          timeZone: timeZoneId,
        })
      : '';

  const scopes = getActiveScopes(scope, targetGroupIds).join(', ');
  const range =
    startDate && endDate ? `${formatDay(startDate)} – ${formatDay(endDate)}` : '';
  const meta = [scopes, range].filter(Boolean).join(' · ');

  const used = goal > 0 ? Math.min(Math.max((spent / goal) * 100, 0), 100) : 0;

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

      <div className="cardFigures">
        {isActive ? (
          <>
            {pending ? (
              <div className="cardSpent cardSpentLoading">&nbsp;</div>
            ) : (
              <div className="cardSpent">
                {displayMoneyFixed(spent.toString(), currency)}
              </div>
            )}
            <div className="cardGoal">
              of {displayMoneyFixed(goal.toString(), currency)}
            </div>
          </>
        ) : (
          <div className="cardCapRow">
            <span className="cardCapLabel">Cap</span>
            <span className="cardCap">
              {displayMoneyFixed(goal.toString(), currency)}
            </span>
          </div>
        )}
      </div>

      {isActive ? (
        <div className={`cardTrack ${pending ? 'loading' : ''}`}>
          {pending ? null : (
            <div className="cardFill" style={{ width: `${used}%` }} />
          )}
        </div>
      ) : null}
    </StyledBudgetCard>
  );
};
