import { useEffect} from 'react';
import { StyledHomepage } from './Home.styled';
import { useNavigate } from 'react-router-dom';
import {
  Group,
  Guest,
  Member,
  User,
  UserInfo,
} from '../../types';
import useBudgetInfo from '../../api/auth/QueryHooks/useBudgetInfo';
import { useOutletContext } from 'react-router-dom';
import {  Signal, useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import { HomeSkeleton } from '../../components/HomeSkeleton/HomeSkeleton';
import { FaPlus } from 'react-icons/fa';
import CreateGroupAnimation from '../../components/Animations/CreateGroupAnimation';
import HomeQuickActionsAnimation from '../../components/Animations/HomeQuickActionsAnimation';
import CreateExpenseForm from '../../components/CreateExpenseForm/CreateExpenseForm';
import TransferForm from '../../components/TransferForm/TransferForm';
import NonGroupExpenseUsersAnimation from '../../components/Animations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '../../components/Animations/NonGroupTransferAnimation';
import { useGetMostRecentGroups } from '@/api/auth/QueryHooks/useGetMostRecentGroups';
import { useTotalUserBalance } from './hooks/useTotalUserBalance';
import ScrollableMenuButtons from './ScrollableMenuButtons/ScrollableMenuButtons';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';

export default function Home() {
  const navigate = useNavigate();

  const isPersonal = useSignal<boolean>(true);
  const isNonGroupExpense = useSignal<boolean>(false);

  const nonGroupUsers = useSignal<User[]>([]);
  const fromHomeGroup = useSignal<Group | null>(null);
  const groupMembers = useSignal<(Guest | Member)[]>([]);
  const { userInfo, topMenuTitle, } = useOutletContext<{
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
  const currencyMenu = useSignal<string | null>(null);
  const recentContextId = userInfo?.recentContextId;

  const {
    groupBalances,
    nonGroupBalances,
    isFetching,
    nonGroupGroupedTransactions,
  } = useTotalUserBalance(userInfo?.userId || '');

  const {
    data: mostRecentGroupData,
    isFetching: mostRecentGroupDataIsFetching,
  } = useGetMostRecentGroups(recentContextId);

  const { data: activeBudgetData} = useBudgetInfo();

  useEffect(() => {
    topMenuTitle.value = '';
    const saved = sessionStorage.getItem('submittedFromHomePersistData');
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

  const isGlowing = quickActionsMenu.value === 'quickActions';

  useCloseOnBack(
    quickActionsMenu.value === 'newTransfer',
    () => (quickActionsMenu.value = null)
  );

  return (
    <StyledHomepage>
      {isFetching || !userInfo?.username ? (
        <HomeSkeleton />
      ) : (
        <div className="fadeIn">
          <ScrollableMenuButtons
            mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
            mostRecentGroupData={mostRecentGroupData}
            recentContextId={recentContextId}
            nonGroupGroupedTransactions={nonGroupGroupedTransactions}
            userInfo={userInfo}
            navigate={navigate}
            groupBalances={groupBalances}
            nonGroupBalances={nonGroupBalances}
            topMenuTitle={topMenuTitle}
            activeBudgetData={activeBudgetData}
            showBudgetInfo={userInfo.showBudgetInfo}
          />
          {quickActionsMenu.value !== 'createGroup' && (
            <div
              className={`actions ${isGlowing ? 'glow' : ''}`}
              onClick={() =>
                (quickActionsMenu.value =
                  quickActionsMenu.value === 'quickActions'
                    ? null
                    : 'quickActions')
              }
            >
              <FaPlus className="thunder" />
            </div>
          )}
        </div>
      )}
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
          groupMembers={groupMembers}
          currency={userInfo.currency}
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
      <CreateGroupAnimation menu={quickActionsMenu} currencyMenu={currencyMenu} />
      <NonGroupTransferAnimation
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={fromHomeGroup}
        groupMembers={groupMembers}
      />
    </StyledHomepage>
  );
}
