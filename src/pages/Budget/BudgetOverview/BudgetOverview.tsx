import IonIcon from '@reacticons/ionicons';
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
import {
  displayCurrencyAndAmount,
  displayMoneyFixed,
} from '@/helpers/displayCurrencyAndAmount';
import { getActiveScopes } from '@/helpers/getActiveScopes';
import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
import { convertDaysToDaysHoursAndMinutes } from '../ProgressBar/utils/convertDaysToDaysHoursAndMinutes';
import { Frequency, UserInfo } from '@/types';
import { StyledBudgetOverview } from './BudgetOverview.styled';
import { elapsedPercent, pct } from '@/helpers/budgetProgress';

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

  const capUsed = pct(spent, cap);
  const cycleElapsed = elapsedPercent(data?.startDate, data?.endDate);

  const timeLeft = convertDaysToDaysHoursAndMinutes(data?.endDate, timeZoneId);

  const budgetCount =
    (data?.id ? 1 : 0) + (inactiveBudgetsData?.budgets?.length ?? 0);

  const formatDay = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          timeZone: timeZoneId,
        })
      : '';

  const manageRow = (
    <ItemCard className="manageRow" onClick={() => navigate('/budget/manage')}>
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
          <BackButton onClick={() => navigate('/')} />
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
          <BackButton onClick={() => navigate('/')} />
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
        <BackButton onClick={() => navigate('/')} />
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

        <div className="figures">
          <div className="figuresRow">
            <div className="figureBlock">
              <div className="figureLabel">Spent</div>
              <div className="spentFigure">
                {displayMoneyFixed(spent.toString(), currency)}
              </div>
            </div>
            <div className="figureBlock cap">
              <div className="figureLabel">Cap</div>
              <div className="capFigure">
                {displayMoneyFixed(cap.toString(), currency)}
              </div>
            </div>
          </div>

          <div className="progress">
            <div className="track">
              <div className="fill" style={{ width: `${capUsed}%` }} />
              <div className="marker" style={{ left: `${cycleElapsed}%` }} />
            </div>
            <div className="captions">
              <span>{Math.round(capUsed)}% of cap used</span>
              <span>{Math.round(cycleElapsed)}% of cycle elapsed</span>
            </div>
          </div>
        </div>

        {BudgetInfoMessage(false, data, false, undefined, undefined, timeZoneId)}

        <PropertyList>
          <PropertyRow label="Remaining">
            <span className="monoValue">
              {displayCurrencyAndAmount((cap - spent).toString(), currency)}
            </span>
          </PropertyRow>
          <PropertyRow label="Time left">
            <span className="monoValue">
              {dateIsInFuture(data?.startDate, timeZoneId)
                ? 'Not started'
                : dateIsInPast(data?.endDate, timeZoneId)
                  ? 'Expired'
                  : `${timeLeft.days}d ${timeLeft.hours}h`}
            </span>
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
              {formatDay(data?.startDate)} – {formatDay(data?.endDate)}
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
