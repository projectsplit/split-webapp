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

export const clearFiltersForJump = (
  template: RecurringExpenseResponseItem
): void => {
  if (template.transactionType === TransactionType.Group) {
    sessionStorage.removeItem(
      getFilterStorageKey('expense', template.groupId ?? undefined)
    );
    return;
  }

  if (template.transactionType === TransactionType.NonGroup) {
    sessionStorage.removeItem(getFilterStorageKey('expense'));
    return;
  }

  sessionStorage.removeItem(getFilterStorageKey('expense', undefined, true));
};

export const scopeLabel = (
  template: RecurringExpenseResponseItem
): string => {
  if (template.transactionType === TransactionType.Group) {
    return template.groupName ?? 'Group';
  }

  return template.transactionType === TransactionType.NonGroup
    ? 'Quick split'
    : 'Personal';
};
