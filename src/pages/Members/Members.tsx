import { StyledMembers } from './Members.styled';
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { groupTransactions } from '../../helpers/groupTransactions';
import { Group, Mode, UserInfo } from '../../types';
import { Signal, useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import MemberDebtCard from './MemberDebtCard/MemberDebtCard';
import SettleUpAnimation from '../../components/Animations/SettleUpAnimation';
import Spinner from '../../components/Spinner/Spinner';
import AddNewUserAnimation from '../../components/Animations/AddNewUserAnimation';
import getAllDebtsParticipants from '@/helpers/getAllDebtsParticipants';
import { useDebts } from '@/api/auth/QueryHooks/useDebts';

const EMPTY_DEBTS = { debts: [], totalSpent: {} };

export default function Members() {
  const idSelectedToSettleUp = useSignal<string>('');
  const menu = useSignal<string | null>(null);
  const guestToBeReplaced = useSignal<{ guestId: string; guestName: string }>({
    guestId: '',
    guestName: '',
  });

  const { groupid } = useParams();
  const { userInfo, group, showBottomBar, mode } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
    mode: Mode;
  }>();

  const { data, isFetching } = useDebts(mode, groupid);
  const { debts, totalSpent } = data ?? EMPTY_DEBTS;

  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

  const allParticipants = useMemo(
    () => getAllDebtsParticipants(debts, mode, members, guests),
    [debts, mode, members, guests]
  );

  const { groupedTransactions } = useMemo(() => {
    const groupedTransactions =
      mode === Mode.Group
        ? groupTransactions(
            debts ?? [],
            allParticipants ?? [],
            userMemberId || ''
          )
        : groupTransactions(
            debts ?? [],
            allParticipants ?? [],
            userInfo?.userId || ''
          );
    return { groupedTransactions };
  }, [debts, allParticipants, mode, userMemberId, userInfo?.userId]);

  const sortedParticipants = useMemo(
    () =>
      mode === Mode.Group
        ? [...allParticipants].sort((a, b) => {
            if (a.id === userMemberId) return -1;
            if (b.id === userMemberId) return 1;
            return 0;
          })
        : [...allParticipants].sort((a, b) => {
            if (a.id === userInfo?.userId) return -1;
            if (b.id === userInfo?.userId) return 1;
            return 0;
          }),
    [allParticipants, mode, userMemberId, userInfo?.userId]
  );

  useEffect(() => {
    isFetching ? (showBottomBar.value = false) : (showBottomBar.value = true);
  }, [isFetching, showBottomBar]);

  if (!userInfo) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <StyledMembers>
      {isFetching ? (
        <Spinner />
      ) : mode === Mode.NonGroup ? (
        <MemberDebtCard
          group={group}
          key={userInfo.userId}
          pendingTransactions={debts ?? []}
          groupedTransactions={groupedTransactions}
          id={userInfo.userId}
          name={userInfo.username}
          isLoggedUser={true}
          isGuest={false}
          menu={menu}
          idSelectedToSettleUp={idSelectedToSettleUp}
          participants={
            allParticipants.length > 0
              ? allParticipants
              : [{ id: userInfo.userId, name: userInfo.username }]
          }
          totalSpent={totalSpent}
          guestToBeReplaced={guestToBeReplaced}
          userOrMemberId={userInfo.userId}
        />
      ) : (
        sortedParticipants?.map((p) => (
          <MemberDebtCard
            group={group}
            key={p.id}
            pendingTransactions={debts ?? []}
            groupedTransactions={groupedTransactions}
            id={p.id}
            name={p.name}
            isLoggedUser={p.id === userMemberId || p.id === userInfo.userId}
            isGuest={guests?.some((g) => g.id === p.id) ?? false}
            menu={menu}
            idSelectedToSettleUp={idSelectedToSettleUp}
            participants={allParticipants || []}
            totalSpent={totalSpent}
            guestToBeReplaced={guestToBeReplaced}
            userOrMemberId={userMemberId ?? userInfo.userId}
          />
        ))
      )}
      <MenuAnimationBackground menu={menu} />
      <SettleUpAnimation
        menu={menu}
        pendingTransactions={debts ?? []}
        idSelectedToSettleUp={idSelectedToSettleUp}
        members={allParticipants || []}
        userId={userMemberId ?? userInfo.userId}
      />
      <AddNewUserAnimation
        menu={menu}
        guestToBeReplaced={guestToBeReplaced.value}
      />
    </StyledMembers>
  );
}
