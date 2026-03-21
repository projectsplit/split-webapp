import { StyledProgressBar } from './ProgressBar.styled';
import { TbTargetArrow } from 'react-icons/tb';
import { ProgressBarProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useTheme } from 'styled-components';
import { getIsoDateInfo } from '../../../helpers/getIsoDateInfo';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { progressBarColor } from './utils/progressBarColor';
import { convertDaysToDaysHoursAndMinutes } from './utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';

export default function ProgressBar({ data, isOn, setIsOn }: ProgressBarProps) {
  const theme = useTheme();
  let percentage: number = 0;

  if (data?.totalAmountSpent !== undefined && data?.goal !== undefined) {
    const totalAmountSpent = parseFloat(data.totalAmountSpent);
    const goal = parseFloat(data.goal);
    if (!isNaN(totalAmountSpent) && !isNaN(goal)) {
      percentage = parseFloat(((totalAmountSpent / goal) * 100).toFixed(1));
    }
  }

  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    data?.endDate
  );

  const startDateDecomposed = getIsoDateInfo(data?.startDate);
  const endDateDecomposed = getIsoDateInfo(data?.endDate);

  const {mutate: toggleBudget} = useToggleBudget();

  return (
    <StyledProgressBar percentage={percentage} color={progressBarColor(data,theme)}>
      {/* <div className="closeButton" onClick={()=>setMenu("deleteBudgetConfirmation")}>
        <IonIcon name="close-outline" className="close" />
      </div> */}
      <div className="budgetInfo">
        <div className="thisPeriod">
          <div className="budgetTitle">
            {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{' '}
            {endDateDecomposed.dateNumber} {endDateDecomposed.month}
          </div>
          <div className="progressBar">
            <TbTargetArrow className="targetIcon" />

            <div className="wrapper">
              <div className="barWrapper">
                <div className="bar" />
              </div>
              <div className="monetaryProgress">
                {data?.currency !== undefined ? (
                  <strong>
                    {displayCurrencyAndAmount(
                      data.totalAmountSpent,
                      data.currency
                    )}{' '}
                    / {displayCurrencyAndAmount(data.goal, data.currency)}
                  </strong>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="amount">{percentage < 0 ? 0 : percentage}%</div>
          </div>
          <div className="toggleAndInfo">
            <div className="miscInfo">
              <div className="description">
                Description:&nbsp;
                <strong>
                  {data?.description !== undefined ? data.description : ''}
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
                Avg spent per day:&nbsp;
                <strong>
                  {data?.currency !== undefined
                    ? displayCurrencyAndAmount(
                        data.averageSpentPerDay,
                        data.currency
                      )
                    : ''}
                </strong>
              </div>
            </div>
            <ToggleSwitch isOn={isOn} onToggle={() => {
              setIsOn(false);
              setTimeout(() => {
                toggleBudget({budgetId: data?.id}, {
                  onError: () => setIsOn(true),
                });
              }, 400);
            }} />
          </div>
        </div>
      </div>
    </StyledProgressBar>
  );
}
