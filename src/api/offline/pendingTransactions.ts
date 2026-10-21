import { signal } from '@preact/signals-react';
import { createStore, del, delMany, entries, set } from 'idb-keyval';
import {
  CreateTransferRequest,
  CreateTransfersRequest,
  GroupExpenseRequest,
  NonGroupExpenseRequest,
  PersonalExpenseRequest,
} from '@/types';

type PendingBase = {
  /** Its own key. For an expense or a single transfer it is also the id sent with it. */
  id: string;
  /** Who filed it. Only a session of the same person ever sends it. */
  userId: string;
  /** When it was filed on this device. */
  savedAt: string;
  /** Display names by member or user id, taken from the form so it can be shown offline. */
  names: Record<string, string>;
  /** The server's reason for turning it down. Set, it waits for the person instead. */
  rejection?: string;
};

// Group records also keep the group's name, and the member id the person has in it: a group's
// shares, payments and transfers all go by member.
type InGroup = { groupName: string; memberId: string };

export type PendingGroupExpense = PendingBase &
  InGroup & {
    kind: 'groupExpense';
    request: GroupExpenseRequest & { groupId: string };
  };

export type PendingNonGroupExpense = PendingBase & {
  kind: 'nonGroupExpense';
  request: NonGroupExpenseRequest;
};

export type PendingPersonalExpense = PendingBase & {
  kind: 'personalExpense';
  request: PersonalExpenseRequest;
};

export type PendingGroupTransfer = PendingBase &
  InGroup & {
    kind: 'groupTransfer';
    request: CreateTransferRequest & { groupId: string };
  };

export type PendingNonGroupTransfer = PendingBase & {
  kind: 'nonGroupTransfer';
  request: CreateTransferRequest;
};

/** Several transfers recorded together. They are sent, and stored, as one batch. */
export type PendingGroupSettleUp = PendingBase &
  InGroup & {
    kind: 'groupSettleUp';
    request: CreateTransfersRequest & { groupId: string };
  };

export type PendingNonGroupSettleUp = PendingBase & {
  kind: 'nonGroupSettleUp';
  request: CreateTransfersRequest;
};

export type PendingExpense =
  | PendingGroupExpense
  | PendingNonGroupExpense
  | PendingPersonalExpense;

export type PendingTransfer =
  | PendingGroupTransfer
  | PendingNonGroupTransfer
  | PendingGroupSettleUp
  | PendingNonGroupSettleUp;

/**
 * A new expense or transfer the server has not confirmed yet. It is kept in IndexedDB rather than
 * localStorage because Chromium writes localStorage to disk on a delay, and the app being swiped
 * away right after something was filed must not lose it.
 */
export type PendingTransaction = PendingExpense | PendingTransfer;

export type PendingKind = PendingTransaction['kind'];

export type PendingInGroup =
  | PendingGroupExpense
  | PendingGroupTransfer
  | PendingGroupSettleUp;

export type PendingSettleUp = PendingGroupSettleUp | PendingNonGroupSettleUp;

export const isPendingExpense = (x: PendingTransaction): x is PendingExpense =>
  x.kind === 'groupExpense' ||
  x.kind === 'nonGroupExpense' ||
  x.kind === 'personalExpense';

export const isPendingInGroup = (x: PendingTransaction): x is PendingInGroup =>
  x.kind === 'groupExpense' ||
  x.kind === 'groupTransfer' ||
  x.kind === 'groupSettleUp';

export const isPendingSettleUp = (
  x: PendingTransaction
): x is PendingSettleUp =>
  x.kind === 'groupSettleUp' || x.kind === 'nonGroupSettleUp';

const store = createStore('buqs-pending-transactions', 'transactions');

/** Everything pending on this device, oldest first. Readers filter for the signed-in person. */
export const pendingTransactions = signal<PendingTransaction[]>([]);

const bySavedAt = (a: PendingTransaction, b: PendingTransaction) =>
  a.savedAt.localeCompare(b.savedAt);

const replace = (transaction: PendingTransaction) => {
  pendingTransactions.value = [
    ...pendingTransactions.value.filter((x) => x.id !== transaction.id),
    transaction,
  ].sort(bySavedAt);
};

// Store operations run one at a time. A read that overlapped a discard could otherwise put the
// discarded record back, and the next sync would send it.
let lastOperation: Promise<unknown> = Promise.resolve();

const serially = <T>(operation: () => Promise<T>): Promise<T> => {
  const result = lastOperation.then(operation, operation);
  lastOperation = result.catch(() => undefined);
  return result;
};

const readAll = async () => {
  const stored = await entries<string, PendingTransaction>(store);
  pendingTransactions.value = stored.map(([, x]) => x).sort(bySavedAt);
};

/** Reads what is stored, which another tab may have added to or sent from since the last read. */
export const loadPendingTransactions = () => serially(readAll);

/** Stored first and shown second, so nothing appears as saved that would not survive a restart. */
export const keepPendingTransaction = (transaction: PendingTransaction) =>
  serially(async () => {
    await set(transaction.id, transaction, store);
    replace(transaction);
  });

export const dropPendingTransaction = (id: string) =>
  serially(async () => {
    await del(id, store);
    pendingTransactions.value = pendingTransactions.value.filter(
      (x) => x.id !== id
    );
  });

/** Records the server's refusal, unless the person discarded it in the meantime. */
export const rejectPendingTransaction = (
  transaction: PendingTransaction,
  rejection: string
) =>
  serially(async () => {
    if (!pendingTransactions.value.some((x) => x.id === transaction.id)) {
      return;
    }

    const rejected = { ...transaction, rejection };
    await set(rejected.id, rejected, store);
    replace(rejected);
  });

/** Puts a turned-down one back in line, for when the person thinks it was a passing problem. */
export const requeuePendingTransaction = (transaction: PendingTransaction) =>
  keepPendingTransaction({ ...transaction, rejection: undefined });

/** For signing out on purpose, which the person is warned discards these. */
export const dropPendingTransactionsOf = (userId: string) =>
  serially(async () => {
    await readAll();

    const ids = pendingTransactions.value
      .filter((x) => x.userId === userId)
      .map((x) => x.id);

    await delMany(ids, store);
    pendingTransactions.value = pendingTransactions.value.filter(
      (x) => x.userId !== userId
    );
  });
