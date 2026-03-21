import { StyledProgressBar } from './ProgressBar.styled';
import { ProgressBarProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { useTheme } from 'styled-components';
import { getIsoDateInfo } from '../../../helpers/getIsoDateInfo';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import { progressBarColor } from './utils/progressBarColor';
import { convertDaysToDaysHoursAndMinutes } from './utils/convertDaysToDaysHoursAndMinutes';
import { useToggleBudget } from '@/api/auth/CommandHooks/useToggleBudget';
import { Bar } from './Bar/Bar';

export default function ProgressBar({ data, isOn, setIsOn }: ProgressBarProps) {
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
      <div className="budgetInfo">
        <div className="thisPeriod">
          <Bar color={progressBarColor(data, theme)} data={data} />
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
