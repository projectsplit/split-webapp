import { TbTargetArrow } from 'react-icons/tb';
import { StyledBar } from './Bar.styled';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { BudgetInfoResponse } from '@/types';
import { getIsoDateInfo } from '@/helpers/getIsoDateInfo';

export const Bar = ({
  color,
  data,
}: {
  color: string;
  data: BudgetInfoResponse | undefined;
}) => {
  let percentage: number = 0;
  if (data?.totalAmountSpent !== undefined && data?.goal !== undefined) {
    const totalAmountSpent = parseFloat(data.totalAmountSpent);
    const goal = parseFloat(data.goal);
    if (!isNaN(totalAmountSpent) && !isNaN(goal)) {
      percentage = parseFloat(((totalAmountSpent / goal) * 100).toFixed(1));
    }
  }
  const startDateDecomposed = getIsoDateInfo(data?.startDate);
  const endDateDecomposed = getIsoDateInfo(data?.endDate);

  return (
    <StyledBar $percentage={percentage} $color={color}>
      <div className="budgetTitle">
        {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{' '}
        {endDateDecomposed.dateNumber} {endDateDecomposed.month}
      </div>
      <div className="barAndInfo">
        <TbTargetArrow className="targetIcon" />
        <div className="wrapper">
          <div className="barWrapper">
            <div className="bar" />
          </div>
          <div className="monetaryProgress">
            {data?.currency !== undefined ? (
              <strong>
                {displayCurrencyAndAmount(data.totalAmountSpent, data.currency)}{' '}
                / {displayCurrencyAndAmount(data.goal, data.currency)}
              </strong>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="amount">{percentage < 0 ? 0 : percentage}%</div>
      </div>
    </StyledBar>
  );
};
