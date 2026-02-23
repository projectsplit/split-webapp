import { ExpenseResponseItem, Guest, Member, Mode, TruncatedMember } from "@/types";
import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

export default function getAllExpenseParticipants(
  expenses: ExpenseResponseItem[] | undefined,
  mode: Mode,
  members: Member[],
  guests: Guest[],
  nonGroupUsers: TruncatedMember[] = []
): TruncatedMember[] {
  if (mode === Mode.Group) {
    return mergeMembersAndGuests(members || [], guests || []);
  }

  const userMap = new Map<string, string>();

  // Initialize with known non-group users
  nonGroupUsers.forEach((u) => userMap.set(u.id, u.name));

  if (expenses) {
    for (const expense of expenses) {
      if (expense.payments && Array.isArray(expense.payments)) {
        for (const p of expense.payments) {
          if ("userId" in p && "username" in p) {
            userMap.set(p.userId, p.username);
          }
        }
      }

      if (expense.shares && Array.isArray(expense.shares)) {
        for (const s of expense.shares) {
          if ("userId" in s && "username" in s) {
            userMap.set(s.userId, s.username);
          }
        }
      }
    }
  }

  return Array.from(userMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));
}
