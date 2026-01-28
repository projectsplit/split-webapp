import { Signal } from "@preact/signals-react";
import {
  ExpenseResponseItem,
  FormExpense,
  Group,
  GroupPayment,
  GroupShare,
  Payment,
  Share,
  TruncatedMember,
  User,
} from "../../types";

export const buildFormExpense = (
  selectedExpense: Signal<ExpenseResponseItem | undefined | null>,
  expenseType: string,
  group: Group | undefined
): FormExpense | undefined => {
  if (!selectedExpense.value) return undefined;
  const baseExpense = {
    id: selectedExpense.value.id,
    amount: selectedExpense.value.amount.toString(),
    description: selectedExpense.value.description,
    currency: selectedExpense.value.currency,
    labels: selectedExpense.value.labels,
    location: selectedExpense.value.location,
    expenseTime: new Date(selectedExpense.value.occurred),
    creationTime: new Date(selectedExpense.value.created),
    lastUpdateTime: new Date(selectedExpense.value.updated),
  };

  if (expenseType === "Group") {
    return {
      ...baseExpense,
      groupId: group?.id,
      participants: (selectedExpense.value.shares as GroupShare[]).map(
        (share) => ({
          memberId: share.memberId,
          participationAmount: share.amount.toString(),
        })
      ),
      payers: (selectedExpense.value.payments as GroupPayment[]).map(
        (payment) => ({
          memberId: payment.memberId,
          paymentAmount: payment.amount.toString(),
        })
      ),
    };
  }

  if (expenseType === "NonGroup") {
    return {
      ...baseExpense,
      participants: (selectedExpense.value.shares as Share[]).map((share) => ({
        userId: share.userId,
        participationAmount: share.amount.toString(),
      })),
      payers: (selectedExpense.value.payments as Payment[]).map((payment) => ({
        userId: payment.userId,
        paymentAmount: payment.amount.toString(),
      })),
    };
  }
  return { ...baseExpense };
};

export const getNonGroupUsers = (
  expenseType: string,
  shares: Share[] | GroupShare[] | undefined,
  payments: Payment[] | GroupPayment[] | undefined,
  members: TruncatedMember[]
): User[] => {
  if (expenseType !== "NonGroup") return [];
  const uniqueUserIds = new Set<string>();
  // Helper to safely add IDs
  const addIds = (
    transactions:
      | Share[]
      | GroupShare[]
      | Payment[]
      | GroupPayment[]
      | undefined
  ) => {
    if (!transactions) return;
    transactions.forEach((t) => {
      if ("userId" in t) uniqueUserIds.add(t.userId);
      if ("memberId" in t) uniqueUserIds.add(t.memberId);
    });
  };

  addIds(shares);
  addIds(payments);
  console.log(uniqueUserIds, members)
  const users: User[] = [];
  uniqueUserIds.forEach((id) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      users.push({ userId: id, username: member.name });
    }
  });

  return users;
};
