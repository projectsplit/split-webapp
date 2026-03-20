import { StyledInactiveBudget } from './InactiveBudget.styled';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { convertDaysToDaysHoursAndMinutes } from '@/pages/Budget/ProgressBar/utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { InactiveBudgetsInfoResponseItem } from '@/types';
import { getIsoDateInfo } from '@/helpers/getIsoDateInfo';

interface InactiveBudgetProps {
  budget: InactiveBudgetsInfoResponseItem;
}

export const InactiveBudget = ({ budget }: InactiveBudgetProps) => {
  const { mutate: toggleBudget } = useToggleBudget();

  const startDateDecomposed = getIsoDateInfo(budget?.startDate);
  const endDateDecomposed = getIsoDateInfo(budget?.endDate);
  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    budget?.endDate
  );

  return (
    <StyledInactiveBudget>
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
          <div className="remainingDays">
            Remaining time:{' '}
            <strong>
              {convertedDaysHoursMinutes.days}d{' '}
              {convertedDaysHoursMinutes.hours}h{' '}
              {convertedDaysHoursMinutes.minutes}m{' '}
            </strong>
          </div>
          <div className="averageSpending">
            Goal:&nbsp;
            <strong>
              {budget?.currency !== undefined
                ? displayCurrencyAndAmount(budget?.amount, budget?.currency)
                : ''}
            </strong>
          </div>
        </div>
        <ToggleSwitch
          isOn={false}
          onToggle={() => toggleBudget({ budgetId: budget?.id })}
        />
      </div>
    </StyledInactiveBudget>
  );
};
