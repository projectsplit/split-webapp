import { ExpenseResponseItem, Guest, Member, TransactionType, TruncatedMember } from "@/types";
import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

function getAllParticipants(expenses: ExpenseResponseItem[] | undefined, transactionType: TransactionType, members: Member[], guests: Guest[]): TruncatedMember[] {
  if (!expenses || expenses.length === 0) {
    return [];
  }
  switch (transactionType) {
    case "NonGroup":
      const userMap = new Map<string, string>();

      for (const expense of expenses) {
        if (expense.payments && Array.isArray(expense.payments)) {
          for (const p of expense.payments) {
            if ('userId' in p && 'userName' in p) {
              userMap.set(p.userId, p.userName);
            }
          }
        }

        if (expense.shares && Array.isArray(expense.shares)) {
          for (const s of expense.shares) {
            if ('userId' in s && 'userName' in s) {
              userMap.set(s.userId, s.userName);
            }
          }
        }
      }

      const users: TruncatedMember[] = Array.from(userMap.entries()).map(
        ([id, name]) => ({ id, name })
      );

      return users;

    case "Group":
      return mergeMembersAndGuests(members || [], guests || [])
    default:
      return [];
  }

}

export default getAllParticipants;