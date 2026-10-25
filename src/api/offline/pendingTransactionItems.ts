import { ExpenseResponseItem, Mode, TransactionType } from '@/types';
import { transferTitle } from '@/helpers/transferTitle';
import {
  isPendingExpense,
  isPendingInGroup,
  isPendingSettleUp,
  PendingExpense,
  PendingTransaction,
  PendingTransfer,
} from './pendingTransactions';

/** The person's own id in it: their member id in a group, their user id elsewhere. */
const ownIdOf = (x: PendingTransaction) =>
  isPendingInGroup(x) ? x.memberId : x.userId;

/** "You" for the person themselves, otherwise the name the form had for them. */
export const pendingName = (x: PendingTransaction, id: string) =>
  id === ownIdOf(x) ? 'You' : (x.names[id] ?? 'Someone');

/** The one transfer it is, or for a settle-up the transfers it holds. */
export const transfersOf = (x: PendingTransfer) =>
  isPendingSettleUp(x)
    ? x.request.transfers.map((t) => ({ ...t, id: t.transferId ?? '' }))
    : [{ ...x.request, id: x.id }];

/** How it names itself in a list. */
export const pendingTitle = (x: PendingTransaction) => {
  if (isPendingExpense(x)) {
    return x.request.description || x.request.location?.google?.name || '';
  }
  if (isPendingSettleUp(x)) return 'Settle up';

  return transferTitle(
    pendingName(x, x.request.senderId),
    pendingName(x, x.request.receiverId)
  );
};

/** When it happened, as the person entered it. A settle-up's transfers all share one time. */
export const pendingOccurred = (x: PendingTransaction) =>
  isPendingSettleUp(x)
    ? (x.request.transfers[0]?.occurred ?? x.savedAt)
    : x.request.occurred;

/** What to call it in a sentence. */
export const pendingNoun = (x: PendingTransaction) =>
  isPendingExpense(x)
    ? 'expense'
    : isPendingSettleUp(x)
      ? 'settle-up'
      : 'transfer';

/** The list it is headed for, as a short label. */
export const pendingPlace = (x: PendingTransaction) =>
  isPendingInGroup(x)
    ? x.groupName || 'Group'
    : x.kind === 'personalExpense'
      ? 'Personal'
      : 'Quick split';

/** The amount to show for it, or nothing for a settle-up that spans currencies. */
export const pendingAmount = (x: PendingTransaction) => {
  if (!isPendingSettleUp(x)) {
    return { amount: x.request.amount, currency: x.request.currency };
  }

  const transfers = transfersOf(x);
  const currencies = new Set(transfers.map((t) => t.currency));
  if (currencies.size !== 1) return null;

  return {
    amount: transfers.reduce((sum, t) => sum + Number(t.amount), 0),
    currency: transfers[0].currency,
  };
};

/** "2 expenses and 1 transfer", and how many that is. A settle-up counts as its transfers. */
export const describePendingCount = (transactions: PendingTransaction[]) => {
  const expenses = transactions.filter(isPendingExpense).length;
  const transfers = transactions
    .filter((x): x is PendingTransfer => !isPendingExpense(x))
    .reduce((sum, x) => sum + transfersOf(x).length, 0);

  const parts = [
    expenses > 0
      ? `${expenses} ${expenses === 1 ? 'expense' : 'expenses'}`
      : '',
    transfers > 0
      ? `${transfers} ${transfers === 1 ? 'transfer' : 'transfers'}`
      : '',
  ].filter(Boolean);

  return { text: parts.join(' and '), count: expenses + transfers };
};

const transactionTypes: Record<PendingExpense['kind'], TransactionType> = {
  groupExpense: TransactionType.Group,
  nonGroupExpense: TransactionType.NonGroup,
  personalExpense: TransactionType.Personal,
};

/** The person's own part, which is what the personal list shows a shared expense at. */
const shareOf = (expense: PendingExpense): number | undefined => {
  switch (expense.kind) {
    case 'personalExpense':
      return expense.request.amount;
    case 'nonGroupExpense':
      return expense.request.shares.find((s) => s.userId === expense.userId)
        ?.amount;
    case 'groupExpense':
      return expense.request.shares.find((s) => s.memberId === expense.memberId)
        ?.amount;
  }
};

/**
 * The pending expenses an expense list should show: the ones the server will put in that list once
 * they arrive. The personal list, like the server's, also takes in shared expenses the person has
 * a share of.
 */
export const pendingExpensesFor = (
  transactions: PendingTransaction[],
  userId: string | undefined,
  mode: Mode,
  groupId: string | undefined
): PendingExpense[] =>
  transactions.filter(isPendingExpense).filter((x) => {
    if (!userId || x.userId !== userId) return false;

    switch (mode) {
      case Mode.Group:
        return x.kind === 'groupExpense' && x.request.groupId === groupId;
      case Mode.NonGroup:
        return x.kind === 'nonGroupExpense';
      case Mode.Personal:
        return shareOf(x) !== undefined;
    }
  });

/**
 * A pending expense in the shape the server will return it in, so the list draws it with the same
 * row as everything else. Label ids follow the server's pattern too: the row tells a person's own
 * labels from a group's by the underscore in theirs.
 */
export const toExpenseItem = (
  expense: PendingExpense,
  mode: Mode
): ExpenseResponseItem => {
  const { request } = expense;

  const item = {
    transactionType: transactionTypes[expense.kind],
    id: expense.id,
    created: expense.savedAt,
    updated: expense.savedAt,
    occurred: request.occurred,
    creatorId:
      expense.kind === 'groupExpense' ? expense.memberId : expense.userId,
    amount: request.amount,
    description: request.description,
    currency: request.currency,
    location: request.location ?? undefined,
    groupId:
      expense.kind === 'groupExpense' ? expense.request.groupId : undefined,
    recurringExpenseId: null,
    labels: request.labels.map((label) => ({
      id:
        expense.kind === 'groupExpense'
          ? `pending-${label.text}`
          : `${expense.userId}_${label.text}`,
      text: label.text,
      color: label.color,
    })),
  };

  if (mode === Mode.Personal) {
    return { ...item, amount: shareOf(expense) ?? 0 };
  }

  switch (expense.kind) {
    case 'groupExpense':
      return {
        ...item,
        payments: expense.request.payments,
        shares: expense.request.shares,
      };
    case 'nonGroupExpense':
      return {
        ...item,
        payments: expense.request.payments.map((p) => ({
          ...p,
          username: expense.names[p.userId] ?? '',
        })),
        shares: expense.request.shares.map((s) => ({
          ...s,
          username: expense.names[s.userId] ?? '',
        })),
      };
    case 'personalExpense':
      return item;
  }
};

/** One transfer row: a single pending transfer, or one of a pending settle-up's. */
export type PendingTransferRow = {
  pending: PendingTransfer;
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  currency: string;
  occurred: string;
  description: string;
};

/** The pending transfers a transfer list should show, a settle-up as each of its transfers. */
export const pendingTransferRowsFor = (
  transactions: PendingTransaction[],
  userId: string | undefined,
  mode: Mode,
  groupId: string | undefined
): PendingTransferRow[] =>
  transactions
    .filter((x): x is PendingTransfer => !isPendingExpense(x))
    .filter((x) => {
      if (!userId || x.userId !== userId) return false;

      return mode === Mode.Group
        ? (x.kind === 'groupTransfer' || x.kind === 'groupSettleUp') &&
            x.request.groupId === groupId
        : mode === Mode.NonGroup &&
            (x.kind === 'nonGroupTransfer' || x.kind === 'nonGroupSettleUp');
    })
    .flatMap((pending) =>
      transfersOf(pending).map((t) => ({
        pending,
        id: t.id,
        senderId: t.senderId,
        receiverId: t.receiverId,
        amount: Number(t.amount),
        currency: t.currency,
        occurred: t.occurred,
        description: t.description,
      }))
    );
