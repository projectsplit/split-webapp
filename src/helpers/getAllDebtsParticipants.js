import { Mode } from '@/types';
import { mergeMembersAndGuests } from './mergeMembersAndGuests';
export default function getAllDebtsParticipants(debts, mode, members, guests) {
    if (mode === Mode.Group) {
        return mergeMembersAndGuests(members || [], guests || []);
    }
    const nonGroupDebtorsUsersMap = new Map();
    debts.forEach((u) => {
        if (u.creditor) {
            nonGroupDebtorsUsersMap.set(u.creditor, u.creditorName || '');
        }
        if (u.debtor) {
            nonGroupDebtorsUsersMap.set(u.debtor, u.debtorName || '');
        }
    });
    const uniqueUserIds = new Set();
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
        name: nonGroupDebtorsUsersMap.get(id),
    }));
}
