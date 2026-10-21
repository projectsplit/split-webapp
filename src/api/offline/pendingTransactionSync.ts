import { onlineManager, QueryClient } from '@tanstack/react-query';
import { signal } from '@preact/signals-react';
import axios, { AxiosError } from 'axios';
import { apiClient } from '../apiClients';
import { queryClient } from '../queryClient';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import { messageFromError } from '@/components/GlobalWarning/globalWarningState';
import { isConnectivityError } from './connectivity';
import {
  keepPendingTransaction,
  dropPendingTransaction,
  loadPendingTransactions,
  PendingKind,
  PendingTransaction,
  pendingTransactions,
  rejectPendingTransaction,
} from './pendingTransactions';

const ENDPOINTS: Record<PendingKind, string> = {
  groupExpense: '/expenses/create',
  nonGroupExpense: '/expenses/create-non-group',
  personalExpense: '/expenses/create-personal',
  groupTransfer: '/transfers/create',
  nonGroupTransfer: '/transfers/create-non-group',
  groupSettleUp: '/transfers/create-many',
  nonGroupSettleUp: '/transfers/create-many-non-group',
};

// Long enough for a weak mobile signal to get an answer through, short enough that nobody is left
// watching a spinner at the till. Past it the record is kept on the device and sent later, and
// since it carries its own id, a first attempt that did arrive after all is not stored twice.
const SEND_TIMEOUT_MS = 15_000;

const FIRST_RETRY_DELAY_MS = 10_000;
const MAX_RETRY_DELAY_MS = 5 * 60_000;
const REFRESH_WAIT_MS = 10_000;

const GROUP_TRANSFER_KEYS = [
  'debts',
  'groupTransfers',
  'home',
  'shared',
  'mostRecentGroup',
];

// What a new record of each kind changes on screen.
const AFFECTED_QUERY_KEYS: Record<PendingKind, string[]> = {
  groupExpense: [
    'debts',
    'groupExpenses',
    'home',
    'shared',
    'mostRecentGroup',
    'cumulativeArray',
    'personalExpenses',
    'userTotals',
  ],
  nonGroupExpense: [
    'nonGroupDebts',
    'nonGroupExpenses',
    'shared',
    'mostRecentGroup',
    'home',
    'non-group-expense-users',
    'cumulativeArray',
    'personalExpenses',
    'userTotals',
  ],
  personalExpense: ['personalExpenses', 'userTotals', 'cumulativeArray'],
  groupTransfer: GROUP_TRANSFER_KEYS,
  nonGroupTransfer: [
    'nonGroupDebts',
    'nonGroupTransfers',
    'home',
    'shared',
    'mostRecentGroup',
    'non-group-transfer-users',
  ],
  groupSettleUp: GROUP_TRANSFER_KEYS,
  nonGroupSettleUp: [
    'nonGroupDebts',
    'nonGroupTransfers',
    'home',
    'shared',
    'mostRecentGroup',
  ],
};

// The lists that show a record of each kind as a row, as opposed to the totals and balances it
// also changes.
const LISTING_QUERY_KEYS: Record<PendingKind, string[]> = {
  groupExpense: ['groupExpenses', 'personalExpenses'],
  nonGroupExpense: ['nonGroupExpenses', 'personalExpenses'],
  personalExpense: ['personalExpenses'],
  groupTransfer: ['groupTransfers'],
  nonGroupTransfer: ['nonGroupTransfers'],
  groupSettleUp: ['groupTransfers'],
  nonGroupSettleUp: ['nonGroupTransfers'],
};

type NewTransaction = { kind: PendingKind; groupId?: string };

const affectedKeys = (transactions: NewTransaction[]) =>
  new Set([
    ...transactions.flatMap((x) => AFFECTED_QUERY_KEYS[x.kind]),
    ...transactions.flatMap((x) => (x.groupId ? [x.groupId] : [])),
  ]);

// All at once rather than one by one: some of these refetches are slow, and the screen waits on
// the sum of them otherwise.
export const refreshAfterNewTransactions = async (
  client: QueryClient,
  transactions: NewTransaction[]
) => {
  await Promise.all(
    [...affectedKeys(transactions)].map((key) =>
      client.invalidateQueries({ queryKey: [key], exact: false })
    )
  );
};

// Whether the lists on screen that show these records as rows have their refreshed versions, the
// only place a pending copy stands in for one. A refetch that failed, or that was paused by the
// connection dropping again, leaves its query invalidated; a list nobody is looking at refetches
// when it is next shown, so it does not count.
const listsCaughtUp = (transactions: NewTransaction[]) => {
  const keys = new Set(transactions.flatMap((x) => LISTING_QUERY_KEYS[x.kind]));

  return queryClient
    .getQueryCache()
    .findAll({
      predicate: (query) =>
        keys.has(String(query.queryKey[0])) && query.isActive(),
    })
    .every((query) => !query.state.isInvalidated);
};

const groupIdOf = (x: PendingTransaction) =>
  x.kind === 'groupExpense' ||
  x.kind === 'groupTransfer' ||
  x.kind === 'groupSettleUp'
    ? x.request.groupId
    : undefined;

const postTransaction = (transaction: PendingTransaction) =>
  apiClient.post(ENDPOINTS[transaction.kind], transaction.request, {
    timeout: SEND_TIMEOUT_MS,
  });

// How apiClient fails a request once the session is over: a refused refresh cancels it, an
// unrecognised token comes back as a 401.
const endedSession = (error: unknown) =>
  axios.isCancel(error) || (error as AxiosError)?.response?.status === 401;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/** A new record as the form describes it; who filed it and when are added here. */
export type TransactionDraft = DistributiveOmit<
  PendingTransaction,
  'userId' | 'savedAt' | 'rejection'
>;

export type SendOutcome = 'sent' | 'kept';

/**
 * Sends a new expense or transfer, or keeps it on the device to be sent later when the server
 * cannot be reached. Rejects only when the server answered and turned it down: that is the one
 * outcome the person can still put right from the form in front of them.
 */
export const sendOrKeep = async (
  draft: TransactionDraft
): Promise<SendOutcome> => {
  const userId = getSignedInUserId();
  if (!userId) throw new Error('Not signed in');

  const transaction = {
    ...draft,
    userId,
    savedAt: new Date().toISOString(),
  } as PendingTransaction;

  let retryLater = false;

  if (onlineManager.isOnline()) {
    try {
      await postTransaction(transaction);
      return 'sent';
    } catch (error) {
      // Connected in name only. Trying again straight away would most likely time out again, so it
      // waits; offline, the connection coming back is what sends it.
      if (isConnectivityError(error)) retryLater = true;
      // A session that ended under the request keeps the record for the same person, whose
      // signing back in sends it.
      else if (!endedSession(error)) throw error;
    }
  }

  await keepPendingTransaction(transaction);
  if (retryLater) scheduleRetry();

  return 'kept';
};

/** Set while pending records are being sent, so the screens can say so. */
export const isSyncing = signal(false);

let running: Promise<void> | null = null;
let runAgain = false;
let retryTimer: ReturnType<typeof setTimeout> | undefined;
let retryDelay = FIRST_RETRY_DELAY_MS;

const scheduleRetry = () => {
  clearTimeout(retryTimer);
  retryTimer = setTimeout(() => void syncPendingTransactions(), retryDelay);
  retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS);
};

/**
 * Sends the signed-in person's pending records, oldest first. Safe to call at any moment and as
 * often as wanted: a call during a run makes that run go round once more rather than starting a
 * second one alongside it.
 */
export const syncPendingTransactions = (): Promise<void> => {
  if (running) {
    runAgain = true;
    return running;
  }

  running = (async () => {
    try {
      do {
        runAgain = false;
        await withTabLock(sendPendingTransactions);
      } while (runAgain);
    } catch (error) {
      console.error('Sending pending records failed:', error);
    } finally {
      running = null;
    }
  })();

  return running;
};

// Tabs of the web app share one store, and each would otherwise send the same records at the same
// time. The server would only store them once, but there is no reason to make it sort that out.
const withTabLock = (send: () => Promise<void>) =>
  navigator.locks
    ? navigator.locks.request('buqs-pending-transactions', send)
    : send();

const sendPendingTransactions = async () => {
  const userId = getSignedInUserId();
  if (!userId || !onlineManager.isOnline()) return;

  await loadPendingTransactions();

  const queue = pendingTransactions.value.filter(
    (x) => x.userId === userId && !x.rejection
  );
  if (queue.length === 0) return;

  isSyncing.value = true;
  const sent: PendingTransaction[] = [];
  let retry = false;

  try {
    for (const transaction of queue) {
      // Discarded while the ones before it were being sent.
      if (!pendingTransactions.value.some((x) => x.id === transaction.id)) {
        continue;
      }

      const outcome = await sendPendingTransaction(transaction);

      if (outcome === 'sent') sent.push(transaction);

      // Whatever stopped this one stops the rest the same way.
      if (outcome === 'unreachable') {
        retry = true;
        return;
      }
      if (outcome === 'signedOut') return;
    }

    retryDelay = FIRST_RETRY_DELAY_MS;
  } finally {
    // A sent record stays pending until the lists on screen show the server's copy. Dropping it
    // sooner would leave it in neither place whenever the refresh after sending fails, and the
    // connection is at its shakiest just as it comes back. Holding on is safe: the next run sends it
    // again, and the server recognises it by its id. The wait is capped so a slow refetch cannot
    // hold the run open.
    let caughtUp = false;

    try {
      if (sent.length > 0) {
        const sentTransactions = sent.map((x) => ({
          kind: x.kind,
          groupId: groupIdOf(x),
        }));

        await Promise.race([
          refreshAfterNewTransactions(queryClient, sentTransactions),
          new Promise((resolve) => setTimeout(resolve, REFRESH_WAIT_MS)),
        ]);
        caughtUp = listsCaughtUp(sentTransactions);
      }
    } finally {
      if (caughtUp) {
        await Promise.all(sent.map((x) => dropPendingTransaction(x.id)));
      } else if (sent.length > 0) {
        retry = true;
      }

      if (retry) scheduleRetry();
      isSyncing.value = false;
    }
  }
};

type SyncOutcome = 'sent' | 'rejected' | 'unreachable' | 'signedOut';

const sendPendingTransaction = async (
  transaction: PendingTransaction
): Promise<SyncOutcome> => {
  try {
    await postTransaction(transaction);
  } catch (error) {
    if (isConnectivityError(error)) return 'unreachable';

    // The session ended underneath it. It waits, untouched, for the same person to sign back in.
    if (endedSession(error)) return 'signedOut';

    await rejectPendingTransaction(
      transaction,
      messageFromError(error, 'The server could not accept this.')
    );
    return 'rejected';
  }

  return 'sent';
};

let started = false;

/** Ties sending to the moments a pending record can get through. Called once, at start-up. */
export const startPendingTransactionSync = () => {
  if (started) return;
  started = true;

  loadPendingTransactions()
    .then(syncPendingTransactions)
    .catch((error) => console.error('Reading pending records failed:', error));

  onlineManager.subscribe((online) => {
    if (!online) return;

    retryDelay = FIRST_RETRY_DELAY_MS;
    void syncPendingTransactions();
  });

  // Coming back to the app is when someone who was offline is most likely to have a signal again.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void syncPendingTransactions();
  });
};
