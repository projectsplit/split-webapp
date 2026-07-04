import { amountIsValid } from '../../../helpers/amountIsValid';
export function submitExpenseFromState(state, inputs) {
    const { groupId, createExpenseMutation, editExpenseMutation, isnonGroupExpense, fromPersonal, isCreateExpense, expense, fromHomeGroup, } = inputs;
    const participants = state.participantsByCategory[state.participantsCategory
        .value];
    const payers = state.payersByCategory[state.payersCategory.value];
    // Deselect participants with zero amount in Shares mode
    if (state.participantsCategory.value === 'Shares') {
        participants.forEach((p) => {
            if (p.actualAmount === '0.00') {
                p.selected = false;
            }
        });
    }
    // Deselect payers with zero amount in Shares mode
    if (state.payersCategory.value === 'Shares') {
        payers.forEach((p) => {
            if (p.actualAmount === '0.00') {
                p.selected = false;
            }
        });
    }
    if (!amountIsValid(state.amount, state.setAmountError, state.setShowAmountError))
        return;
    if (!state.location && state.description.length === 0) {
        state.setDescriptionError('Select a description or a location');
        return;
    }
    let expenseRequest;
    if (fromPersonal) {
        expenseRequest = {
            amount: Number(state.amount),
            ...(isCreateExpense ? {} : { expenseId: expense?.id }),
            currency: state.currencySymbol,
            description: state.description,
            location: state.location ?? null,
            occurred: state.expenseTime,
            labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
        };
    }
    else if (isnonGroupExpense?.value) {
        expenseRequest = {
            amount: Number(state.amount),
            ...(isCreateExpense ? {} : { expenseId: expense?.id }),
            currency: state.currencySymbol,
            payments: payers
                .filter((value) => value.selected)
                .map((value) => ({
                userId: value.id,
                amount: Number(value.actualAmount),
            })),
            shares: participants
                .filter((value) => value.selected)
                .map((value) => ({
                userId: value.id,
                amount: Number(value.actualAmount),
            })),
            description: state.description,
            location: state.location ?? null,
            occurred: state.expenseTime,
            labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
        };
    }
    else {
        expenseRequest = {
            amount: Number(state.amount),
            ...(isCreateExpense
                ? { groupId: groupId || fromHomeGroup?.value?.id }
                : { expenseId: expense?.id }),
            currency: state.currencySymbol,
            payments: payers
                .filter((value) => value.selected)
                .map((value) => ({
                memberId: value.id,
                amount: Number(value.actualAmount),
            })),
            shares: participants
                .filter((value) => value.selected)
                .map((value) => ({
                memberId: value.id,
                amount: Number(value.actualAmount),
            })),
            description: state.description,
            location: state.location ?? null,
            occurred: state.expenseTime,
            labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
        };
    }
    state.setIsSubmitting(true);
    if (isCreateExpense) {
        createExpenseMutation(expenseRequest);
    }
    else {
        editExpenseMutation(expenseRequest);
    }
}
