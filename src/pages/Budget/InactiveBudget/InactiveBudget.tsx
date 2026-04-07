import { StyledInactiveBudget } from './InactiveBudget.styled';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { convertDaysToDaysHoursAndMinutes } from '@/pages/Budget/ProgressBar/utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { InactiveBudgetsInfoResponseItem } from '@/types';
import { getIsoDateInfo } from '@/helpers/getIsoDateInfo';
import { useState } from 'react';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import IonIcon from '@reacticons/ionicons';
import { Signal } from '@preact/signals-react';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';

interface InactiveBudgetProps {
  budget: InactiveBudgetsInfoResponseItem;
  onActivate: () => void;
  menu: Signal<string | null>;
  timeZoneId: string;
}

export const InactiveBudget = ({
  budget,
  onActivate,
  menu,
  timeZoneId,
}: InactiveBudgetProps) => {
  const { mutate: toggleBudget } = useToggleBudget();
  const [isOn, setIsOn] = useState(false);

  console.log(budget)
  const startDateDecomposed = getIsoDateInfo(budget?.startDate);
  const endDateDecomposed = getIsoDateInfo(budget?.endDate);
  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    budget?.endDate,
    timeZoneId
  );

  return (
    <StyledInactiveBudget>
      <div
        className="cogContainer"
        onClick={() => {
          menu.value = 'manageBudgetMenu';
        }}
      >
        {' '}
        <IonIcon name="settings-outline" className="cog" />
      </div>
      <div className="budgetTitle">
        {' '}
        &quot;{budget?.description !== undefined ? budget.description : ''}
        &quot;
      </div>
      <div className="toggleAndInfo">
        <div className="miscInfo">
          <div className="dates">
            Period:&nbsp;
            <strong>
              {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{' '}
              {endDateDecomposed.dateNumber} {endDateDecomposed.month}
            </strong>
          </div>
          {dateIsInFuture(budget?.startDate) ? (
            <div className="remainingDays">Not Started Yet</div>
          ) : dateIsInPast(budget?.endDate) ? (
            <div className="remainingDays" style={{ color: '#FC6F6F' }}>
              Expired
            </div>
          ) : (
            <div className="remainingDays">
              Remaining time:{' '}
              <strong>
                {convertedDaysHoursMinutes.days}d{' '}
                {convertedDaysHoursMinutes.hours}h{' '}
                {convertedDaysHoursMinutes.minutes}m{' '}
              </strong>
            </div>
          )}
          <div className="averageSpending">
            Goal:&nbsp;
            <strong>
              {budget?.currency !== undefined
                ? displayCurrencyAndAmount(budget?.amount, budget?.currency)
                : ''}
            </strong>
          </div>
          <div className="scope">
            Scope:&nbsp;
            <strong>
              {getActiveScopes(budget?.scope, budget?.targetGroupIds).join(
                ', '
              )}
            </strong>
          </div>
        </div>
        <ToggleSwitch
          isOn={isOn}
          onToggle={() => {
            setIsOn(true);
            onActivate();
            setTimeout(() => {
              toggleBudget(
                { budgetId: budget?.id },
                {
                  onError: () => setIsOn(false),
                }
              );
            }, 400);
          }}
        />
      </div>
    </StyledInactiveBudget>
  );
};
