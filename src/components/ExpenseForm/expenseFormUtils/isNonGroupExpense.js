export function isNonGroupExpense(expense) {
    return !!expense && expense.groupId === undefined;
}
