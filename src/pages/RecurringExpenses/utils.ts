import {
  FormExpense,
  GroupPayment,
  GroupShare,
  Payment,
  RecurringExpenseResponseItem,
  Share,
  TransactionType,
} from '@/types';
import { createJumpToken } from '@/api/auth/helpers/createJumpToken';
import { getFilterStorageKey } from '@/components/SearchTransactions/helpers/localStorageStringParser';

/**
 * Reshapes a template into what the expense form already knows how to edit, so managing a series
 * reuses the amount, participant, label and location controls rather than a second, thinner form.
 * Labels arrive as text and colour only — the template stores them the same way an unsent expense
 * does, since their ids are minted per scope when each occurrence is written.
 */
export const buildFormExpenseFromTemplate = (
  template: RecurringExpenseResponseItem
): FormExpense => {
  const base: FormExpense = {
    id: template.id,
    amount: template.amount.toString(),
    currency: template.currency,
    description: template.description,
    labels: template.labels.map((label) => ({
      id: `${template.id}_${label.text}`,
      text: label.text,
      color: label.color,
    })),
    location: template.location ?? undefined,
    expenseTime: new Date(template.anchorDate),
    creationTime: new Date(template.created),
    lastUpdateTime: new Date(template.updated),
  };

  if (template.transactionType === TransactionType.Group) {
    return {
      ...base,
      groupId: template.groupId ?? undefined,
      participants: ((template.shares as GroupShare[]) ?? []).map((share) => ({
        memberId: share.memberId,
        participationAmount: share.amount.toString(),
      })),
      payers: ((template.payments as GroupPayment[]) ?? []).map((payment) => ({
        memberId: payment.memberId,
        paymentAmount: payment.amount.toString(),
      })),
    };
  }

  if (template.transactionType === TransactionType.NonGroup) {
    return {
      ...base,
      participants: ((template.nonGroupShares as Share[]) ?? []).map(
        (share) => ({
          userId: share.userId,
          participationAmount: share.amount.toString(),
        })
      ),
      payers: ((template.nonGroupPayments as Payment[]) ?? []).map(
        (payment) => ({
          userId: payment.userId,
          paymentAmount: payment.amount.toString(),
        })
      ),
    };
  }

  return base;
};

/**
 * Where tapping a row goes: the list the most recent occurrence lives in, scrolled to that expense.
 * Null when the template has not produced one, or when the expense it produced has since been
 * deleted by hand.
 */
export const buildJumpPath = (
  template: RecurringExpenseResponseItem
): string | null => {
  if (!template.lastExpenseOccurred || !template.lastExpenseCreated) {
    return null;
  }

  const jumpToken = createJumpToken(
    template.lastExpenseOccurred,
    template.lastExpenseCreated
  );

  if (template.transactionType === TransactionType.Group) {
    if (!template.groupId) return null;
    return `/shared/${template.groupId}/expenses?jumpTo=${jumpToken}`;
  }

  if (template.transactionType === TransactionType.NonGroup) {
    return `/shared/nongroup/expenses?jumpTo=${jumpToken}`;
  }

  return `/personal?jumpTo=${jumpToken}`;
};

/**
 * An active filter can hide the very expense being jumped to, leaving the user on a list that looks
 * like nothing happened. Same clearing the personal-expenses jump already does.
 */
export const clearFiltersForJump = (
  template: RecurringExpenseResponseItem
): void => {
  if (template.transactionType === TransactionType.Group) {
    localStorage.removeItem(
      getFilterStorageKey('expense', template.groupId ?? undefined)
    );
    return;
  }

  if (template.transactionType === TransactionType.NonGroup) {
    localStorage.removeItem(getFilterStorageKey('expense'));
    return;
  }

  localStorage.removeItem(getFilterStorageKey('expense', undefined, true));
};

export const scopeLabel = (
  template: RecurringExpenseResponseItem
): string => {
  if (template.transactionType === TransactionType.Group) {
    return template.groupName ?? 'Group';
  }

  return template.transactionType === TransactionType.NonGroup
    ? 'Non-group'
    : 'Personal';
};
