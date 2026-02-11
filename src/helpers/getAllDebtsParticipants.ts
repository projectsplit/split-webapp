import { Debt, Guest, Member, TransactionType, TransferResponseItem, TruncatedMember } from "@/types";
import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

export default function getAllDebtsParticipants(
  debts: Debt[],
  transactionType: TransactionType,
  members: Member[],
  guests: Guest[],
): TruncatedMember[] {
  if (transactionType === "Group") {
    return mergeMembersAndGuests(members || [], guests || []);
  }

  const nonGroupDebtorsUsersMap = new Map<string, string>();

  debts.forEach((u) => {
    if (u.creditor) {
      nonGroupDebtorsUsersMap.set(u.creditor, u.creditorName || "");
    }
    if (u.debtor) {
      nonGroupDebtorsUsersMap.set(u.debtor, u.debtorName || "");
    }
  });

  const uniqueUserIds = new Set<string>();

  if (debts) {
    for (const debt of debts) {
      if (debt.creditor) {
        uniqueUserIds.add(debt.creditor);
      }
      if (debt.debtor) {
        uniqueUserIds.add(debt.debtor);
      }
    }
  }

  return Array.from(uniqueUserIds)
    .filter((id) => nonGroupDebtorsUsersMap.has(id))
    .map((id) => ({
      id,
      name: nonGroupDebtorsUsersMap.get(id)!,
    }));
}
