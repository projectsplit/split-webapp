import { useEffect} from 'react';
import { StyledHomepage } from './Home.Styled';
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
import { AiFillThunderbolt } from 'react-icons/ai';
import HomeQuickActionsAnimation from '../../components/Animations/HomeQuickActionsAnimation';
import CreateExpenseForm from '../../components/CreateExpenseForm/CreateExpenseForm';
import TransferForm from '../../components/TransferForm/TransferForm';
import NonGroupExpenseUsersAnimation from '../../components/Animations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '../../components/Animations/NonGroupTransferAnimation';
import { useGetMostRecentGroups } from '@/api/auth/QueryHooks/useGetMostRecentGroups';
import { useTotalUserBalance } from './hooks/useTotalUserBalance';
import ScrollableMenuButtons from './ScrollableMenuButtons/ScrollableMenuButtons';
import { FaRegHeart } from 'react-icons/fa6';
import { useGetDonationPrompt } from '@/api/auth/QueryHooks/useGetDonationPrompt';
import SupportMenuAnimation from '../../components/Animations/SupportMenuAnimation';

export default function Home() {
  const navigate = useNavigate();

  const isPersonal = useSignal<boolean>(true);
  const isNonGroupExpense = useSignal<boolean>(false);
  const isNonGroupTransfer = useSignal<boolean>(true);

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
  const supportMenu = useSignal<string | null>(null);
  const recentContextId = userInfo?.recentContextId;

  // Cached alongside the prompt's own lookup, so this costs no extra request. Only the
  // `isAvailable` flag is read here: an instance with no Google Play credentials should not offer a
  // button that can only dead-end.
  const { data: donationInfo } = useGetDonationPrompt(true);

  const {
    totalBalances,
    isLoading,
    isFetching,
    groupsData,
    nonGroupGroupedTransactions,
  } = useTotalUserBalance(userInfo?.userId || '');

  const {
    data: mostRecentGroupData,
    isFetching: mostRecentGroupDataIsFetching,
  } = useGetMostRecentGroups(recentContextId);

  const { data: activeBudgetData} = useBudgetInfo();

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

  const isGlowing = quickActionsMenu.value === 'quickActions';

  return (
    <StyledHomepage>
      {isFetching || !userInfo?.username ? (
        <HomeSkeleton />
      ) : (
        <div className="fadeIn">
          <div className="fixedTop">
            <div className="welcomeStripe">
              <span>
                Welcome, <strong>{userInfo?.username}</strong>
              </span>
              {/* Hidden only when the server has no Google Play credentials. Shown regardless of
                  whether this person is due to be prompted — the prompt is the app asking, this is
                  them choosing, and someone who turned the asking off keeps the choice. */}
              {donationInfo?.isAvailable && (
                <button
                  type="button"
                  className="supportButton"
                  onClick={() => (supportMenu.value = 'support')}
                >
                  <FaRegHeart className="heart" />
                  Support Buqs
                </button>
              )}
            </div>
          </div>
          <ScrollableMenuButtons
            mostRecentGroupDataIsFetching={mostRecentGroupDataIsFetching}
            mostRecentGroupData={mostRecentGroupData}
            recentContextId={recentContextId}
            nonGroupGroupedTransactions={nonGroupGroupedTransactions}
            userInfo={userInfo}
            navigate={navigate}
            isLoading={isLoading}
            isFetching={isFetching}
            groupsData={groupsData}
            totalBalances={totalBalances}
            topMenuTitle={topMenuTitle}
            activeBudgetData={activeBudgetData}
            showBudgetInfo={userInfo.showBudgetInfo}
          />
          {/* Pulled while the support form is up. It outranks the menu backdrop, so leaving it
              would put a live quick-actions button on top of a modal. */}
          {supportMenu.value === null && (
            <div
              className={`actions ${isGlowing ? 'glow' : ''}`}
              onClick={() =>
                (quickActionsMenu.value =
                  quickActionsMenu.value === 'quickActions'
                    ? null
                    : 'quickActions')
              }
            >
              <AiFillThunderbolt className="thunder" />
            </div>
          )}
        </div>
      )}
      <MenuAnimationBackground menu={quickActionsMenu} />
      <MenuAnimationBackground menu={supportMenu} />
      <SupportMenuAnimation supportMenu={supportMenu} />

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
    </StyledHomepage>
  );
}
