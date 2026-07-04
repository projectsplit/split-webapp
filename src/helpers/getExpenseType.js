import { TransactionType, } from '../types';
export function isGroupExpense(expense) {
    return expense.transactionType === TransactionType.Group;
}
export function isNonGroupExpense(expense) {
    return expense.transactionType === TransactionType.NonGroup;
}
export function isPersonalExpense(expense) {
    return expense.transactionType === TransactionType.Personal;
}
