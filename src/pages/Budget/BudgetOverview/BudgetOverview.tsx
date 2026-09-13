import IonIcon from '@reacticons/ionicons';
import { DateTime } from 'luxon';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import { useDeleteBudget } from '@/api/auth/CommandHooks/useDeleteBudget';
import PropertyList, { PropertyRow } from '@/components/ListForms/PropertyList';
import ItemCard from '@/components/ListForms/ItemCard';
import Spinner from '@/components/Spinner/Spinner';
import BackButton from '@/components/BackButton/BackButton';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import ManageBudgetAnimation from '@/components/Animations/BudgetAnimations/ManageBudgetAnimation';
import DeleteBudgetConfirmationAnimation from '@/components/Animations/BudgetAnimations/DeleteBudgetConfirmationAnimation';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
import { convertDaysToDaysHoursAndMinutes } from '../ProgressBar/utils/convertDaysToDaysHoursAndMinutes';
import { Frequency, UserInfo } from '@/types';
import { StyledBudgetOverview } from './BudgetOverview.styled';
import { elapsedPercent } from '@/helpers/budgetProgress';
import { BudgetBars } from '@/components/BudgetBars/BudgetBars';
import routes from '@/routes';

export const BudgetOverview = () => {
  const navigate = useNavigate();
  const menu = useSignal<string | null>(null);
  const errorMessage = useSignal<string>('');
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  const timeZoneId = userInfo?.timeZone;

  const { data, isPending } = useBudgetInfo();
  const { data: inactiveBudgetsData } = useGetInactiveBudgetInfo();
  const { mutate: deleteBudget, isPending: isDeleting } = useDeleteBudget(
    menu,
    errorMessage
  );

  const spent = parseFloat(data?.totalAmountSpent ?? '0') || 0;
  const cap = parseFloat(data?.goal ?? '0') || 0;
  const currency = data?.currency ?? '';

  const cycleElapsed = elapsedPercent(data?.startDate, data?.endDate);

  const timeLeft = convertDaysToDaysHoursAndMinutes(data?.endDate, timeZoneId);

  const budgetCount =
    (data?.id ? 1 : 0) + (inactiveBudgetsData?.budgets?.length ?? 0);

  const formatDay = (iso?: string) =>
    iso ? DateTime.fromISO(iso, { zone: timeZoneId }).toFormat('d LLL') : '';

  const manageRow = (
    <ItemCard className="manageRow" onClick={() => navigate(routes.BUDGET_MANAGE)}>
      <div className="manageLabel">Manage budgets</div>
      <div className="manageMeta">
        <span className="manageCount">{budgetCount}</span>
        <span className="manageChevron">
          <IonIcon name="chevron-forward-outline" />
        </span>
      </div>
    </ItemCard>
  );

  if (isPending) {
    return (
      <StyledBudgetOverview>
        <div className="budgetTopBar">
          <BackButton onClick={() => navigate(routes.ROOT)} />
          <div className="title">Budget</div>
          <div className="iconButton" />
        </div>
        <div className="budgetScroll">
          <div className="loading">
            <Spinner />
          </div>
        </div>
      </StyledBudgetOverview>
    );
  }

  if (!data?.id) {
    return (
      <StyledBudgetOverview>
        <div className="budgetTopBar">
          <BackButton onClick={() => navigate(routes.ROOT)} />
          <div className="title">Budget</div>
          <div className="iconButton" />
        </div>

        <div className="budgetScroll">
          <div className="emptyState">
            <div className="emptyTitle">No active budget</div>
            <div className="emptyNote">
              {budgetCount > 0
                ? 'Turn one on from Manage budgets to start tracking your spending against a cap.'
                : 'Create a budget to start tracking your spending against a cap.'}
            </div>
          </div>
          {manageRow}
        </div>
      </StyledBudgetOverview>
    );
  }

  return (
    <StyledBudgetOverview>
      <div className="budgetTopBar">
        <BackButton onClick={() => navigate(routes.ROOT)} />
        <div className="title">Budget</div>
        <div
          className="iconButton"
          onClick={() => (menu.value = 'manageBudgetMenu')}
        >
          <IonIcon name="settings-outline" />
        </div>
      </div>

      <div className="budgetScroll">
        <div className="cycleRow">
          <div className="budgetName">{data?.description || 'Budget'}</div>
          <div className="budgetFrequency">
            {data?.frequency !== undefined ? Frequency[data.frequency] : ''}
          </div>
        </div>

        <BudgetBars
          spent={spent}
          cap={cap}
          currency={currency}
          cycleElapsed={cycleElapsed}
        />

        {BudgetInfoMessage(false, data, false, undefined, undefined, timeZoneId)}

        <PropertyList>
          <PropertyRow label="Remaining">
            <span className="monoValue">
              {displayCurrencyAndAmount((cap - spent).toString(), currency)}
            </span>
          </PropertyRow>
          <PropertyRow label="Time left">
            {dateIsInFuture(data?.startDate, timeZoneId) ? (
              'Not started'
            ) : dateIsInPast(data?.endDate, timeZoneId) ? (
              'Expired'
            ) : (
              <span className="monoValue">
                {`${timeLeft.days}d ${timeLeft.hours}h`}
              </span>
            )}
          </PropertyRow>
          <PropertyRow label="Average per day">
            <span className="monoValue">
              {displayCurrencyAndAmount(data?.averageSpentPerDay, currency)}
            </span>
          </PropertyRow>
          <PropertyRow label="Scope">
            {getActiveScopes(data?.scope, data?.targetGroupIds).join(', ')}
          </PropertyRow>
          <PropertyRow label="Cycle">
            <span className="cycleValue">
              {formatDay(data?.startDate)}
              <span className="dateSep"> – </span>
              {formatDay(data?.endDate)}
            </span>
          </PropertyRow>
        </PropertyList>

        {manageRow}
      </div>

      <MenuAnimationBackground menu={menu} />
      <ManageBudgetAnimation menu={menu} selectedBudget={data} />
      <DeleteBudgetConfirmationAnimation
        menu={menu}
        deleteBudget={deleteBudget}
        selectedBudget={{
          id: data?.id || '',
          descr: data?.description || '',
        }}
        isLoading={isDeleting}
      />
    </StyledBudgetOverview>
  );
};
