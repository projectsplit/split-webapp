export function isGroupExpense(expense) {
    return !!expense && expense.groupId !== undefined;
}
