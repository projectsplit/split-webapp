import { StyledProgressBar } from './ProgressBar.styled';
import { ProgressBarProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useTheme } from 'styled-components';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { progressBarColor } from './utils/progressBarColor';
import { convertDaysToDaysHoursAndMinutes } from './utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { Bar } from './Bar/Bar';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import IonIcon from '@reacticons/ionicons';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';

export default function ProgressBar({
  data,
  isOn,
  setIsOn,
  menu,
}: ProgressBarProps) {
  const theme = useTheme();
  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    data?.endDate
  );

  const { mutate: toggleBudget } = useToggleBudget();

  return (
    <StyledProgressBar>
      {/* <div className="closeButton" onClick={()=>setMenu("deleteBudgetConfirmation")}>
        <IonIcon name="close-outline" className="close" />
      </div> */}
      <div
        className="cogContainer"
        onClick={() => {
          menu.value = 'manageBudgetMenu';
        }}
      >
        {' '}
        <IonIcon name="settings-outline" className="cog" />
      </div>
      <div className="budgetInfo">
        <div className="thisPeriod">
          <Bar color={progressBarColor(data, theme)} data={data} />
          <div className="toggleAndInfo">
            <div className="miscInfo">
              <div className="description">
                Description:&nbsp; "
                {data?.description !== undefined ? data.description : ''}"
              </div>
              {dateIsInFuture(data?.startDate) ? (
                <div className="remainingDays">Not Started Yet</div>
              ) : dateIsInPast(data?.endDate) ? (
                <div className="remainingDays" style={{ color: '#FC6F6F' }}>Expired</div>
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
              <div className="scope">
                Scope:&nbsp;
                <strong>
                  {getActiveScopes(data?.scope, data?.targetGroupIds).join(
                    ', '
                  )}
                </strong>
              </div>
            </div>
            <ToggleSwitch
              isOn={isOn}
              onToggle={() => {
                setIsOn(false);
                setTimeout(() => {
                  toggleBudget(
                    { budgetId: data?.id },
                    {
                      onError: () => setIsOn(true),
                    }
                  );
                }, 400);
              }}
            />
          </div>
        </div>
      </div>
    </StyledProgressBar>
  );
}
