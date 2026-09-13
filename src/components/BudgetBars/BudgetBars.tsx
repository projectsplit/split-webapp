import { useTheme } from 'styled-components';
import ProportionBar from '../ProportionBar/ProportionBar';
import { StyledBarsAndAmounts } from '../BarsWithLegends/BarsAndAmounts/BarsAndAmounts.styled';
import { StyledBudgetBars } from './BudgetBars.styled';
import { displayMoneyFixed } from '../../helpers/displayCurrencyAndAmount';
import { pct } from '../../helpers/budgetProgress';

interface BudgetBarsProps {
  spent: number;
  cap: number;
  currency: string;
  cycleElapsed?: number;
  showSpent?: boolean;
  pending?: boolean;
  compact?: boolean;
}

export const BudgetBars = ({
  spent,
  cap,
  currency,
  cycleElapsed,
  showSpent = true,
  pending,
  compact,
}: BudgetBarsProps) => {
  const theme = useTheme();
  const capUsed = pct(spent, cap);
  const capUsedExact =
    Number.isFinite(spent) && Number.isFinite(cap) && cap > 0
      ? Math.max((spent / cap) * 100, 0)
      : 0;

  const capSide = (
    <>
      <div className="legend">
        <span className="label">Cap</span>
      </div>
      <div className="figures">
        <span className="figure" style={{ color: theme.ink.secondary }}>
          {displayMoneyFixed(cap.toString(), currency)}
        </span>
      </div>
    </>
  );

  if (!showSpent) {
    return (
      <StyledBudgetBars>
        <StyledBarsAndAmounts className="compact">
          <div className="pair">
            <div className="side">{capSide}</div>
          </div>
        </StyledBarsAndAmounts>
      </StyledBudgetBars>
    );
  }

  return (
    <StyledBudgetBars>
      <StyledBarsAndAmounts className="compact">
        <div className="pair">
          <div className="side">
            <div className="legend">
              <span className="label">Spent</span>
            </div>
            <div className="figures">
              <span
                className={`figure${pending ? ' pendingFigure' : ''}`}
                style={{ color: theme.ink.primary }}
              >
                {pending
                  ? ' '
                  : displayMoneyFixed(spent.toString(), currency)}
              </span>
              {compact && !pending ? (
                <span className="percent">{Math.round(capUsedExact)}%</span>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`barWithMarker${pending ? ' pendingBar' : ''}${
            capUsed <= 0 ? ' barEmpty' : ''
          }`}
        >
          <ProportionBar
            variant="split"
            part={pending ? 0 : spent}
            whole={cap}
            partColor={theme.ink.primary}
            wholeColor={theme.surface.raised}
          />
          {cycleElapsed !== undefined && !pending ? (
            <div className="cycleMarker" style={{ left: `${cycleElapsed}%` }} />
          ) : null}
        </div>

        <div className="pair below">
          <div className="side whole">{capSide}</div>
        </div>

        {cycleElapsed !== undefined && !compact ? (
          <div className="captions">
            <span>{Math.round(capUsedExact)}% of cap used</span>
            <span>{Math.round(cycleElapsed)}% of cycle elapsed</span>
          </div>
        ) : null}
      </StyledBarsAndAmounts>
    </StyledBudgetBars>
  );
};
