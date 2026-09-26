import IonIcon from '@reacticons/ionicons';
import { memo, useMemo } from 'react';
import { StyledMemberDebtCard } from './MemberDebtCard.styled';
import { MemberProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import Tree from '../../../components/Tree/Tree';
import SettleUpButton from './SettleUpButton/SettleUpButton';
import { joinAmounts } from '../../../helpers/joinAmounts';
import { getInitials } from '../../../helpers/getInitials';
import {
  Debt,
  Group,
  GroupedTransaction,
  Mode,
  TruncatedMember,
} from '@/types';
import { useOutletContext } from 'react-router-dom';

function MemberDebtCard({
  pendingTransactions: propPendingTransactions,
  groupedTransactions,
  id,
  name,
  isLoggedUser,
  isGuest,
  menu,
  idSelectedToSettleUp,
  participants,
  totalSpent,
  group,
  guestToBeReplaced,
  userOrMemberId,
}: MemberProps) {
  const { mode } = useOutletContext<{
    mode: Mode;
  }>();

  const totalsSpent = totalSpent[id] || {};
  const removeZeroesValuesFromTotalSpent = Object.fromEntries(
    Object.entries(totalsSpent).filter(([, amount]) => amount !== 0)
  );

  const {
    pendingTransactions,
    memberIsOwedItems,
    memberOwesItems,
    soleCreditor,
    soleDebtor,
  } = useMemo(() => {
    const memberTransactions = groupedTransactions.filter(
      (gt: GroupedTransaction) => gt.id === id
    );
    const pendingTransactions = propPendingTransactions.filter(
      (p: Debt) => p.debtor === id || p.creditor === id
    );

    const timesMemberIsOwed = new Set(
      pendingTransactions
        .filter((tx: Debt) => tx.creditor === id)
        .map((tx: Debt) => tx.debtor)
    ).size;
    const timesMemberOwes = new Set(
      pendingTransactions
        .filter((tx: Debt) => tx.debtor === id)
        .map((tx: Debt) => tx.creditor)
    ).size;

    const memberIsOwed = pendingTransactions.some(
      (x: Debt) => x.creditor === id
    );
    const memberOwes = pendingTransactions.some((x: Debt) => x.debtor === id);

    const memberOwesItems = pendingTransactions
      .filter((p: Debt) => p.debtor === id)
      .map((p: Debt, index: number) => (
        <div className="debtRow" key={index}>
          <span className="currencyOwes">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{' '}
          <span className="debtWho">
            <span className="preposition">to</span>{' '}
            <strong>
              {getParticipantName(p, participants, userOrMemberId, 'to')}
            </strong>
          </span>
        </div>
      ));

    const memberIsOwedItems = pendingTransactions
      .filter((p: Debt) => p.creditor === id)
      .map((p: Debt, index: number) => (
        <div className="debtRow" key={index}>
          <span className="currencyIsOwed">
            {displayCurrencyAndAmount(p.amount.toString(), p.currency)}
          </span>{' '}
          <span className="debtWho">
            <span className="preposition">from</span>{' '}
            <strong>
              {getParticipantName(p, participants, userOrMemberId, 'from')}
            </strong>
          </span>
        </div>
      ));

    const soleCreditor =
      timesMemberOwes === 1
        ? getParticipantName(
            pendingTransactions.find((p: Debt) => p.debtor === id) as Debt,
            participants,
            userOrMemberId,
            'to'
          )
        : null;
    const soleDebtor =
      timesMemberIsOwed === 1
        ? getParticipantName(
            pendingTransactions.find((p: Debt) => p.creditor === id) as Debt,
            participants,
            userOrMemberId,
            'from'
          )
        : null;

    return {
      memberTransactions,
      pendingTransactions,
      memberIsOwed,
      memberOwes,
      memberIsOwedItems,
      memberOwesItems,
      soleCreditor,
      soleDebtor,
    };
  }, [
    groupedTransactions,
    id,
    propPendingTransactions,
    participants,
    userOrMemberId,
  ]);

  const showSettleUpButtonFn = (group?: Group) => {
    if (group) {
      return (
        (isGuest || isLoggedUser) &&
        pendingTransactions.length > 0 &&
        !group.isArchived
      );
    } else return isLoggedUser && pendingTransactions.length > 0;
  };
  const showSettleUpButton = showSettleUpButtonFn(group);

  const sumByCurrency = (rows: Debt[]) =>
    Object.entries(
      rows.reduce<Record<string, number>>((acc, p) => {
        acc[p.currency] = (acc[p.currency] ?? 0) + p.amount;
        return acc;
      }, {})
    ) as [string, number][];

  const owedTotals = sumByCurrency(
    pendingTransactions.filter((p: Debt) => p.creditor === id)
  );
  const owesTotals = sumByCurrency(
    pendingTransactions.filter((p: Debt) => p.debtor === id)
  );

  const subject = isLoggedUser ? 'You' : name;

  const tailFor = (isOwed: boolean) =>
    mode === Mode.NonGroup && !isLoggedUser ? (
      <>
        {isOwed ? 'from ' : 'to '}
        <strong>you</strong>
      </>
    ) : (
      'in total'
    );

  const summaries: {
    key: string;
    verb: string;
    isOwed: boolean;
    totals: [string, number][];
    counterpart: string | null;
  }[] = [];
  if (owedTotals.length > 0) {
    summaries.push({
      key: 'owed',
      verb: isLoggedUser ? 'are owed' : 'is owed',
      isOwed: true,
      totals: owedTotals,
      counterpart: soleDebtor,
    });
  }
  if (owesTotals.length > 0) {
    summaries.push({
      key: 'owes',
      verb: isLoggedUser ? 'owe' : 'owes',
      isOwed: false,
      totals: owesTotals,
      counterpart: soleCreditor,
    });
  }

  function getParticipantName(
    p: Debt,
    participants: TruncatedMember[],
    userOrMemberId: string,
    direction: 'to' | 'from'
  ) {
    const targetId = direction === 'to' ? p.creditor : p.debtor;
    if (targetId === userOrMemberId) return 'You';
    return (
      participants.find((m) => m.id === targetId)?.name ||
      (direction === 'to' ? p.creditorName : p.debtorName) ||
      'Unknown'
    );
  }

  return (
    <StyledMemberDebtCard isGuest={isGuest} isLoggedUser={isLoggedUser}>
      <div className="memberHeader">
        <span className={`memberAvatar ${isLoggedUser ? 'you' : ''}`}>
          {getInitials(name)}
        </span>
        <div className="nameRow">
          <span className="memberName">{subject}</span>
          {isGuest ? <span className="guestChip">Guest</span> : null}
        </div>
        {isGuest ? (
          <SettleUpButton
            onClick={() => {
              menu.value = 'newUser';
              guestToBeReplaced.value.guestId = id;
              guestToBeReplaced.value.guestName = name;
            }}
          >
            Invite
          </SettleUpButton>
        ) : null}
      </div>

      <div className="balanceRow">
        <div className="summaries">
          {summaries.length > 0 ? (
            summaries.map((s) => {
              const tail = s.counterpart ? (
                <>
                  {s.isOwed ? 'from ' : 'to '}
                  <strong>{s.counterpart}</strong>
                </>
              ) : (
                tailFor(s.isOwed)
              );
              return (
                <div className="memberSummary" key={s.key}>
                  <span className="owingText">{s.verb}</span>{' '}
                  <span className={`amount ${s.isOwed ? 'isOwed' : 'owes'}`}>
                    {joinAmounts(s.totals)}
                  </span>
                  {tail ? (
                    <>
                      {' '}
                      <span className="owingText">{tail}</span>
                    </>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="memberSummary">
              <span className="owingText">
                {isLoggedUser ? 'are settled' : 'is settled'}
              </span>{' '}
              <IonIcon name="checkmark-sharp" className="checkmark" />
            </div>
          )}
        </div>
      </div>

      {((memberIsOwedItems.length > 1 && !soleDebtor) ||
        (memberOwesItems.length > 1 && !soleCreditor)) && (
        <div className="debtTree">
          {memberIsOwedItems.length > 1 && !soleDebtor && (
            <Tree items={memberIsOwedItems} />
          )}
          {memberOwesItems.length > 1 && !soleCreditor && (
            <Tree items={memberOwesItems} />
          )}
        </div>
      )}

      {(mode === Mode.Group || isLoggedUser || showSettleUpButton) && (
        <div className="footerRow">
          {mode === Mode.Group || isLoggedUser ? (
            <div className="totalSpent">
              {Object.keys(removeZeroesValuesFromTotalSpent).length === 0 ? (
                'No recorded spending'
              ) : (
                <>
                  Spent{' '}
                  <span className="amounts">
                    {joinAmounts(
                      Object.entries(removeZeroesValuesFromTotalSpent) as [
                        string,
                        number,
                      ][]
                    )}
                  </span>
                </>
              )}
            </div>
          ) : null}
          {showSettleUpButton ? (
            <SettleUpButton
              primary
              onClick={() => {
                menu.value = 'SettleUp';
                idSelectedToSettleUp.value = id;
              }}
            >
              Settle up
            </SettleUpButton>
          ) : null}
        </div>
      )}
    </StyledMemberDebtCard>
  );
}

export default memo(MemberDebtCard);
