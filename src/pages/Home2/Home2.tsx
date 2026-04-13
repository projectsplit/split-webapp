import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Signal, useSignal } from '@preact/signals-react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { Group, Guest, Member, User, UserInfo } from '@/types';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import { useGetMostRecentGroups } from '@/api/auth/QueryHooks/useGetMostRecentGroups';
import { useTotalUserBalance } from '../Home/hooks/useTotalUserBalance';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import HomeQuickActionsAnimation from '@/components/Animations/HomeQuickActionsAnimation';
import CreateExpenseForm from '@/components/CreateExpenseForm/CreateExpenseForm';
import TransferForm from '@/components/TransferForm/TransferForm';
import NonGroupExpenseUsersAnimation from '@/components/Animations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '@/components/Animations/NonGroupTransferAnimation';
import { PrometheusTeaser } from './PrometheusTeaser';
import { BalanceGrid } from './BalanceGrid';
import { RecentSection } from './RecentSection';
import { PrometheusCard } from './PrometheusCard';
import { ActionGrid } from './ActionGrid';
import {
  StyledHome2,
  WelcomeSection,
  ScrollableContent,
  FAB,
} from './Home2.styled';

const TEASER_DISMISSED_KEY = 'prometheusTeaserDismissed';

export default function Home2() {
  const navigate = useNavigate();

  const isPersonal = useSignal<boolean>(true);
  const isNonGroupExpense = useSignal<boolean>(false);
  const isNonGroupTransfer = useSignal<boolean>(true);
  const nonGroupUsers = useSignal<User[]>([]);
  const fromHomeGroup = useSignal<Group | null>(null);
  const groupMembers = useSignal<(Guest | Member)[]>([]);

  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const nonGroupExpenseMenu = useSignal<string | null>(null);
  const nonGroupTransferMenu = useSignal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>({
    attribute: '',
    menu: null,
    senderId: '',
    senderName: '',
    receiverId: '',
    receiverName: '',
  });

  const quickActionsMenu = useSignal<string | null>(null);
  const recentContextId = userInfo?.recentContextId;

  const { totalBalances, isLoading, isFetching, nonGroupGroupedTransactions } =
    useTotalUserBalance(userInfo?.userId || '');

  const { data: mostRecentGroupData, isFetching: mostRecentGroupDataIsFetching } =
    useGetMostRecentGroups(recentContextId);

  const { data: activeBudgetData } = useBudgetInfo();

  const [teaserVisible, setTeaserVisible] = useState(
    () => !localStorage.getItem(TEASER_DISMISSED_KEY)
  );

  useEffect(() => {
    topMenuTitle.value = '';
    const saved = localStorage.getItem('submittedFromHomePersistData');
    if (saved) {
      const {
        nonGroupUsers: u,
        fromHomeGroup: g,
        groupMembers: m,
      } = JSON.parse(saved);
      nonGroupUsers.value = u ?? [];
      fromHomeGroup.value = g ?? null;
      groupMembers.value = m ?? [];
      isPersonal.value = false;
      if (fromHomeGroup.value !== null) {
        isNonGroupExpense.value = false;
      }
    }
  }, []);

  const handleDismissTeaser = () => {
    localStorage.setItem(TEASER_DISMISSED_KEY, 'true');
    setTeaserVisible(false);
  };

  const isGlowing = quickActionsMenu.value === 'quickActions';

  if (isFetching || !userInfo?.username) return null;

  return (
    <StyledHome2>
      <div className="fadeIn">
        <WelcomeSection>
          <h2>Welcome, {userInfo.username}</h2>
        </WelcomeSection>

        <ScrollableContent>
          {teaserVisible && (
            <PrometheusTeaser
              onClose={handleDismissTeaser}
              onClick={() => {}}
            />
          )}

          <BalanceGrid
            totalBalances={totalBalances}
            activeBudgetData={activeBudgetData}
            onSharedClick={() => navigate('/shared')}
            onBudgetClick={() =>
              navigate('/budget/manage', { state: { fromHome: true } })
            }
          />

          <RecentSection
            mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
            mostRecentGroupData={mostRecentGroupData}
            recentContextId={recentContextId}
            nonGroupGroupedTransactions={nonGroupGroupedTransactions}
            userInfo={userInfo}
            navigate={navigate}
          />

          <PrometheusCard />

          <ActionGrid
            onPersonalClick={() => {
              topMenuTitle.value = 'Your Expenses';
              navigate('/personal');
            }}
            onAnalyticsClick={() => navigate('/analytics')}
            onBudgetingClick={() => navigate('/budget')}
          />
        </ScrollableContent>

        <FAB
          $isGlowing={isGlowing}
          onClick={() =>
            (quickActionsMenu.value =
              quickActionsMenu.value === 'quickActions'
                ? null
                : 'quickActions')
          }
        >
          <AiFillThunderbolt />
        </FAB>
      </div>

      <MenuAnimationBackground menu={quickActionsMenu} />

      {quickActionsMenu.value === 'newExpense' && (
        <CreateExpenseForm
          groupId={fromHomeGroup.value?.id}
          expense={null}
          timeZoneId={userInfo.timeZone}
          menu={quickActionsMenu}
          timeZoneCoordinates={userInfo.timeZoneCoordinates}
          header="Create New Expense"
          isCreateExpense={true}
          isPersonal={isPersonal}
          isnonGroupExpense={isNonGroupExpense}
          groupMembers={groupMembers}
          currency={userInfo.currency}
          nonGroupUsers={nonGroupUsers}
          nonGroupMenu={nonGroupExpenseMenu}
          fromHomeGroup={fromHomeGroup}
          fromHome={true}
        />
      )}
      {quickActionsMenu.value === 'newTransfer' && (
        <TransferForm
          groupId={fromHomeGroup.value?.id}
          timeZoneId={userInfo.timeZone}
          menu={quickActionsMenu}
          isnonGroupTransfer={isNonGroupTransfer}
          groupMembers={groupMembers}
          currency={userInfo.currency}
          nonGroupUsers={nonGroupUsers}
          fromHomeGroup={fromHomeGroup}
          nonGroupMenu={nonGroupTransferMenu}
          fromHome={true}
        />
      )}

      <HomeQuickActionsAnimation
        quickActionsMenu={quickActionsMenu}
        isNonGroupExpense={isNonGroupExpense}
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={fromHomeGroup}
        userInfo={userInfo}
      />
      <NonGroupExpenseUsersAnimation
        menu={nonGroupExpenseMenu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        fromHomeGroup={fromHomeGroup}
        isNonGroupExpense={isNonGroupExpense}
        fromNonGroup={false}
      />
      <NonGroupTransferAnimation
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={fromHomeGroup}
        groupMembers={groupMembers}
        isNonGroupTransfer={isNonGroupTransfer}
      />
    </StyledHome2>
  );
}
