import { Mode, } from '../../types';
export const buildFormExpense = (selectedExpense, mode, group) => {
    if (!selectedExpense.value)
        return undefined;
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
    if (mode === Mode.Group) {
        return {
            ...baseExpense,
            groupId: group?.id,
            participants: selectedExpense.value.shares?.map((share) => ({
                memberId: share.memberId,
                participationAmount: share.amount.toString(),
            })),
            payers: selectedExpense.value.payments?.map((payment) => ({
                memberId: payment.memberId,
                paymentAmount: payment.amount.toString(),
            })),
        };
    }
    if (mode === Mode.NonGroup) {
        return {
            ...baseExpense,
            participants: selectedExpense.value.shares?.map((share) => ({
                userId: share.userId,
                participationAmount: share.amount.toString(),
            })),
            payers: selectedExpense.value.payments?.map((payment) => ({
                userId: payment.userId,
                paymentAmount: payment.amount.toString(),
            })),
        };
    }
    return { ...baseExpense };
};
export const toUser = (member) => {
    return {
        userId: member.id,
        username: member.name,
    };
};
