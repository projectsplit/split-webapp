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
import { BsFillPersonFill } from 'react-icons/bs';
import { Signal } from '@preact/signals-react';
import { BudgetCarousel } from './BudgetCarousel/BudgetCarousel';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useState } from 'react';

export default function ScrollableMenuButtons({
  mostRecentGroupDataIsFetching,
  mostRecentGroupData,
  recentContextId,
  nonGroupGroupedTransactions,
  userInfo,
  navigate,
  totalBalances,
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
  totalBalances: Details;
  topMenuTitle: Signal<string>;
  activeBudgetData: BudgetInfoResponse | undefined;
  showBudgetInfo: boolean;
}) {
  const { mutateAsync: setShowBudgetInfo } = useSetShowBudgetInfo();
  const [showButton, setShowButton] = useState(false);

  const hasBalanceToShow = Object.values(totalBalances).some(
    (amount) => amount !== 0
  );

  return (
    <StyledScrollableMenuButtons>
      {showBudgetInfo && activeBudgetData && (
        <BudgetCarousel
          activeBudgetData={activeBudgetData}
          setShowBudgetInfo={setShowBudgetInfo}
          setShowButton={setShowButton}
          onClick={() =>
            navigate('/budget/manage', { state: { fromHome: true } })
          }
          timeZoneId={userInfo?.timeZone}
        />
      )}
      {activeBudgetData && !showBudgetInfo && showButton && (
        <div className="undoButton">
          <span
            className="text"
            onClick={() => {
              setShowBudgetInfo(true);
            }}
          >
            undo
          </span>
        </div>
      )}

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
            name="Shared"
            onClick={() => navigate('/shared')}
            meta={
              hasBalanceToShow ? (
                <BalanceMeta details={totalBalances} />
              ) : undefined
            }
          >
            <TiGroup />
          </SelectionButton>

          <SelectionButton
            name="Personal"
            onClick={() => {
              topMenuTitle.value = 'Your Expenses';
              navigate('/personal');
            }}
          >
            <BsFillPersonFill />
          </SelectionButton>

          <SelectionButton
            name="Analytics"
            onClick={() => navigate('/analytics')}
          >
            <BsBarChartFill />
          </SelectionButton>

          <SelectionButton
            name="Budgeting"
            onClick={() => navigate('/budget')}
          >
            <BsFillPiggyBankFill />
          </SelectionButton>
        </div>
      </div>
    </StyledScrollableMenuButtons>
  );
}
