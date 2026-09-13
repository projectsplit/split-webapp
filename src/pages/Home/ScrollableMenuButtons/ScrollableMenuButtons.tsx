import {
  BudgetInfoResponse,
  Details,
  GroupedTransaction,
  MostRecentGroupDetailsResponse,
  UserInfo,
} from '@/types';
import { StyledScrollableMenuButtons } from './ScrollableMenuButtons.styled';
import { NavigateFunction } from 'react-router-dom';
import MostRecentSection from '../MostRecentSection/MostRecentSection';
import BalanceMeta from '@/components/BalanceMeta/BalanceMeta';
import SectionLabel from '@/components/SectionLabel/SectionLabel';
import { TiGroup } from 'react-icons/ti';
import SelectionButton from '../SelectionButton/SelectionButton';
import { BsBarChartFill } from 'react-icons/bs';
import { BsFillPiggyBankFill } from 'react-icons/bs';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { useMostRecentContext } from '@/api/auth/CommandHooks/useMostRecentContext';
import { Signal } from '@preact/signals-react';
import { BudgetBars } from '@/components/BudgetBars/BudgetBars';
import { elapsedPercent } from '@/helpers/budgetProgress';
import { Frequency } from '@/types';
import routes from '@/routes';

export default function ScrollableMenuButtons({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate,
  groupBalances,
  nonGroupBalances,
  topMenuTitle,
  activeBudgetData,
  showBudgetInfo,
}: {
  mostRecentGroupDataIsFetching: boolean;
  mostRecentGroupData: MostRecentGroupDetailsResponse | undefined;
  recentContextId: string;
  nonGroupGroupedTransactions: GroupedTransaction[];
  userInfo: UserInfo;
  navigate: NavigateFunction;
  groupBalances: Details;
  nonGroupBalances: Details;
  topMenuTitle: Signal<string>;
  activeBudgetData: BudgetInfoResponse | undefined;
  showBudgetInfo: boolean;
}) {
  const updateMostRecentContextId = useMostRecentContext();
  const hasBalance = (details: Details) =>
    Object.values(details).some((amount) => amount !== 0);
  const showBudget = !!(showBudgetInfo && activeBudgetData);

  const budgetSpent =
    parseFloat(activeBudgetData?.totalAmountSpent ?? '0') || 0;
  const budgetCap = parseFloat(activeBudgetData?.goal ?? '0') || 0;
  const budgetCycleElapsed = elapsedPercent(
    activeBudgetData?.startDate,
    activeBudgetData?.endDate
  );
  const budgetDays = Math.max(
    0,
    Math.ceil(parseFloat(activeBudgetData?.remainingDays ?? '0') || 0)
  );

  const budgetMeta = (
    <div className="budgetBlock">
      <div className="budgetMetaLine">
        <span>
          {activeBudgetData?.frequency !== undefined
            ? Frequency[activeBudgetData.frequency]
            : ''}
        </span>
        <span>
          {budgetDays} {budgetDays === 1 ? 'day' : 'days'} left
        </span>
      </div>
      <BudgetBars
        spent={budgetSpent}
        cap={budgetCap}
        currency={activeBudgetData?.currency ?? ''}
        cycleElapsed={budgetCycleElapsed}
        compact
      />
    </div>
  );

  return (
    <StyledScrollableMenuButtons>
      <MostRecentSection
        mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
        mostRecentGroupData={mostRecentGroupData}
        recentContextId={recentContextId}
        nonGroupGroupedTransactions={nonGroupGroupedTransactions}
        userInfo={userInfo}
        navigate={navigate}
      />

      <div className="destinations">
        <SectionLabel title="Go to" />
        <div className="destinationList">
          <SelectionButton
            name="Groups"
            onClick={() => navigate(routes.GROUPS)}
            meta={
              hasBalance(groupBalances) ? (
                <BalanceMeta details={groupBalances} />
              ) : undefined
            }
          >
            <TiGroup />
          </SelectionButton>

          <SelectionButton
            name="Quick splits"
            onClick={() => {
              navigate(routes.NON_GROUP_EXPENSES);
              updateMostRecentContextId.mutate('NON_GROUP');
            }}
            meta={
              hasBalance(nonGroupBalances) ? (
                <BalanceMeta details={nonGroupBalances} />
              ) : undefined
            }
          >
            <BsPeopleFill />
          </SelectionButton>

          <SelectionButton
            name="Personal"
            onClick={() => {
              topMenuTitle.value = 'Your Expenses';
              navigate(routes.PERSONAL);
            }}
          >
            <BsFillPersonFill />
          </SelectionButton>

          <SelectionButton
            name="Analytics"
            onClick={() => navigate(routes.ANALYTICS)}
          >
            <BsBarChartFill />
          </SelectionButton>

          <SelectionButton
            name="Budgeting"
            onClick={() => navigate(routes.BUDGET)}
            footer={showBudget ? budgetMeta : undefined}
          >
            <BsFillPiggyBankFill />
          </SelectionButton>
        </div>
      </div>
    </StyledScrollableMenuButtons>
  );
}
