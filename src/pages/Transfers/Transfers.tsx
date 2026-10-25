import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { tokens } from '../../styles/tokens';
import { useQueryClient } from '@tanstack/react-query';
import Transfer from '../../components/Transfer/Transfer';
import LongPressMenu from '../../components/LongPressMenu/LongPressMenu';
import DeleteTransferAnimation from '../../components/Animations/DeleteTransferAnimation';
import {
  Group,
  Mode,
  TransferParsedFilters,
  TransferResponseItem,
  UserInfo,
} from '../../types';
import { StyledTransactionsPage } from '@/components/TransactionsPage.styled';
import { useOutletContext } from 'react-router-dom';
import { Signal, useSignal } from '@preact/signals-react';
import { DateOnly } from '../../helpers/timeHelpers';
import DetailedTransfer from '../../components/DetailedTransfer/DetailedTransfer';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import ErrorMenuAnimation from '../../components/Animations/ErrorMenuAnimation';
import Sentinel from '../../components/Sentinel';
import Spinner from '../../components/Spinner/Spinner';
import GroupTotalsByCurrencyAnimation from '../../components/Animations/GroupTotalsByCurrencyAnimation';
import getAllTransfersParticipants from '@/helpers/getAllTransfersParticipants';
import { useGetAllNonGroupUsers } from '@/api/auth/QueryHooks/useGetAllNonGroupUsers';
import { useTransferList } from './hooks/useTransferList';
import { groupBy } from '../../helpers/groupBy';
import { NoTransfersFound } from './NoTransfersFound/NoTransfersFound';
import { FiltersAndBars } from './FiltersAndBars/FiltersAndBars';
import { useTransferTotals } from './hooks/useTransferTotals';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import {
  PendingTransaction,
  pendingTransactions,
} from '@/api/offline/pendingTransactions';
import {
  pendingName,
  pendingTransferRowsFor,
} from '@/api/offline/pendingTransactionItems';
import PendingTransactionAnimation from '../../components/Animations/PendingTransactionAnimation';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import { hasActiveTransferFilters } from '@/helpers/hasActiveTransferFilters';

const Transfers: React.FC = () => {
  const pageSize = 10;
  const { userInfo, group, showBottomBar, transferParsedFilters, mode } =
    useOutletContext<{
      userInfo: UserInfo;
      group: Group;
      showBottomBar: Signal<boolean>;
      transferParsedFilters: Signal<TransferParsedFilters>;
      mode: Mode;
    }>();
  const groupIsArchived = group?.isArchived;
  const errorMessage = useSignal<string>('');
  const menu = useSignal<string | null>(errorMessage.value ? 'error' : null);
  const queryClient = useQueryClient();
  const timeZoneId = userInfo?.timeZone;
  const memberId = group?.members.find(
    (x) => x.userId === userInfo?.userId
  )?.id;
  const selectedTransfer = useSignal<TransferResponseItem | null>(null);
  const longPressTransfer = useSignal<TransferResponseItem | null>(null);
  const longPressMenu = useSignal<string | null>(null);
  const pendingMenu = useSignal<string | null>(null);
  const selectedPending = useSignal<PendingTransaction | null>(null);
  useCloseOnBack(
    !!selectedTransfer.value,
    () => (selectedTransfer.value = null)
  );
  useCloseOnBack(
    longPressMenu.value === 'options',
    () => (longPressMenu.value = null)
  );
  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isPaused,
    hasPreviousPage,
  } = useTransferList(mode, group, transferParsedFilters, pageSize, timeZoneId);

  const { allUsers } = useGetAllNonGroupUsers(mode);
  const transfers = data?.pages.flatMap((p) => p.transfers);
  const allParticipants = getAllTransfersParticipants(
    transfers,
    mode,
    members,
    guests,
    allUsers.map((u) => ({
      id: u.userId,
      name: u.username,
    }))
  );

  // By the session's own id: offline, the profile it would otherwise come from may not be saved.
  const allPending = pendingTransactions.value;
  const signedInUserId = getSignedInUserId() ?? undefined;
  const pendingRows = useMemo(() => {
    const listedIds = new Set(transfers?.map((x) => x.id));

    return (
      pendingTransferRowsFor(allPending, signedInUserId, mode, group?.id)
        // Sent, and already back in the list from the server: its copy is the one to show.
        .filter((x) => !listedIds.has(x.id))
    );
  }, [allPending, signedInUserId, mode, group?.id, transfers]);

  const openPending = useCallback(
    (transaction: PendingTransaction) => {
      selectedPending.value = transaction;
      pendingMenu.value = 'pendingTransaction';
    },
    [selectedPending, pendingMenu]
  );

  // Offline with nothing saved, the list never loads, and the bar's add button is how a transfer
  // gets recorded for later.
  useEffect(() => {
    showBottomBar.value = !isPending || isPaused;
  }, [isPending, isPaused, showBottomBar]);

  const {
    userTotalSentByCurr,
    userTotalReceivedByCurr,
    userConvertedTotalReceived,
    userConvertedTotalSent,
    totalsAreFetching,
  } = useTransferTotals(group, mode, userInfo, transferParsedFilters);

  if (isPending && !isPaused) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  // Above the newest transfers, so not over search results or a page that starts further back.
  const showPending =
    pendingRows.length > 0 &&
    !hasPreviousPage &&
    !hasActiveTransferFilters(transferParsedFilters.value);

  return (
    <StyledTransactionsPage>
      {transfers && transfers.length > 0 && !hasPreviousPage && (
        <FiltersAndBars
          transferParsedFilters={transferParsedFilters}
          allParticipants={allParticipants}
          group={group}
          queryClient={queryClient}
          menu={menu}
          currency={userInfo?.currency}
          totalsAreFetching={totalsAreFetching}
          userConvertedTotalReceived={userConvertedTotalReceived}
          userConvertedTotalSent={userConvertedTotalSent}
        />
      )}
      <div className="scroll-area" ref={scrollAreaRef}>
        {showPending && (
          <div className="same-date-container">
            <div className="date-only">Not synced yet</div>
            <div className="rows">
              {pendingRows.map((row) => (
                <Transfer
                  key={row.id}
                  onClick={() => openPending(row.pending)}
                  transfer={{
                    amount: row.amount,
                    currency: row.currency,
                    date: row.occurred,
                    description: row.description,
                    id: row.id,
                    senderName: pendingName(row.pending, row.senderId),
                    receiverName: pendingName(row.pending, row.receiverId),
                  }}
                  timeZoneId={timeZoneId}
                  pendingState={row.pending.rejection ? 'rejected' : 'waiting'}
                />
              ))}
            </div>
          </div>
        )}
        {isPending ? (
          <div className="offlineNote">
            {showPending
              ? "The rest of the list will load once you're back online."
              : "You're offline. This list will load once you're back online."}
          </div>
        ) : !transfers || transfers.length === 0 ? (
          showPending ? null : (
            <NoTransfersFound
              transferParsedFilters={transferParsedFilters}
              allParticipants={allParticipants}
              group={group}
              queryClient={queryClient}
            />
          )
        ) : (
          <>
            {Object.entries(
              groupBy(transfers, (x) => DateOnly(x.occurred, timeZoneId))
            ).map(([date, transfers]) => (
              <div key={date} className="same-date-container">
                <div className="date-only">{date}</div>
                <div className="rows">
                  {transfers.map((t) => (
                    <Transfer
                      onClick={() => (selectedTransfer.value = t)}
                      onLongPress={() => {
                        longPressTransfer.value = t;
                        longPressMenu.value = 'options';
                      }}
                      key={t.id}
                      transfer={{
                        amount: t.amount,
                        currency: t.currency,
                        date: t.occurred,
                        description: t.description,
                        id: t.id,
                        senderName:
                          t.senderId === memberId ||
                          t.senderId === userInfo?.userId
                            ? 'You'
                            : (allParticipants.find((x) => x.id === t.senderId)
                                ?.name ?? ''),
                        receiverName:
                          t.receiverId === memberId ||
                          t.receiverId === userInfo?.userId
                            ? 'You'
                            : (allParticipants.find(
                                (x) => x.id === t.receiverId
                              )?.name ?? ''),
                      }}
                      timeZoneId={timeZoneId}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
        <Sentinel
          fetchPage={fetchNextPage}
          hasMore={hasNextPage}
          isFetchingPage={isFetchingNextPage}
        />
      </div>
      {selectedTransfer.value && (
        <DetailedTransfer
          selectedTransfer={selectedTransfer}
          amount={selectedTransfer.value.amount}
          created={selectedTransfer.value.created}
          creator={selectedTransfer.value.creatorId}
          currency={selectedTransfer.value.currency}
          occurred={selectedTransfer.value.occurred}
          timeZoneId={timeZoneId}
          errorMessage={errorMessage}
          userMemberId={userMemberId || ''}
          members={allParticipants}
          groupIsArchived={groupIsArchived}
          userId={userInfo?.userId || ''}
        />
      )}
      {longPressMenu.value === 'options' &&
        longPressTransfer.value &&
        !groupIsArchived && (
          <LongPressMenu
            onDelete={() => (longPressMenu.value = 'deleteTransfer')}
            onClose={() => (longPressMenu.value = null)}
          />
        )}
      {longPressMenu.value === 'deleteTransfer' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: tokens.scrim.sheet,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 998,
          }}
          onClick={() => (longPressMenu.value = null)}
        />
      )}
      <DeleteTransferAnimation
        menu={longPressMenu}
        selectedTransfer={longPressTransfer}
        errorMessage={errorMessage}
      />
      <MenuAnimationBackground menu={menu} />
      <ErrorMenuAnimation
        menu={menu}
        type="transfer"
      />
      <MenuAnimationBackground menu={pendingMenu} />
      <PendingTransactionAnimation
        menu={pendingMenu}
        transaction={selectedPending.value}
        timeZoneId={timeZoneId}
      />
      <GroupTotalsByCurrencyAnimation
        menu={menu}
        bar1Legend="You Sent"
        bar2Legend="You Received"
        groupTotalsByCurrency={userTotalSentByCurr}
        userTotalsByCurrency={userTotalReceivedByCurr}
        relation="independent"
      />
    </StyledTransactionsPage>
  );
};

export default Transfers;
