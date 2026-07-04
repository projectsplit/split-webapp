import { useMemo } from 'react';
export function useAdjustedMembers({ participantsByCategory, payersByCategory, participantsCategory, payersCategory, nonGroupUsers, isnonGroupExpense, userInfo, userMemberId, }) {
    const participants = participantsByCategory[participantsCategory.value];
    const payers = payersByCategory[payersCategory.value];
    const adjustParticipants = useMemo(() => {
        if (!participants)
            return [];
        const userIdToCheck = nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
            ? userInfo?.userId
            : userMemberId;
        return participants.map((m) => m.id === userIdToCheck ? { ...m, name: 'you' } : m);
    }, [
        participants,
        userInfo?.userId,
        userMemberId,
        nonGroupUsers.value.length,
        isnonGroupExpense?.value,
    ]);
    const adjustPayers = useMemo(() => {
        if (!payers)
            return [];
        const userIdToCheck = nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
            ? userInfo?.userId
            : userMemberId;
        return payers.map((m) => m.id === userIdToCheck ? { ...m, name: 'you' } : m);
    }, [
        payers,
        userInfo?.userId,
        userMemberId,
        nonGroupUsers.value.length,
        isnonGroupExpense?.value,
    ]);
    return {
        participants,
        payers,
        adjustParticipants,
        adjustPayers,
    };
}
