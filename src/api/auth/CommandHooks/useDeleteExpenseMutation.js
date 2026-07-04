import { TransactionType } from '../../../types';
import { useDeleteExpense } from './useDeleteExpense';
import { useDeleteNonGroupExpense } from './useDeleteNonGroupExpense';
import { useDeletePersonalExpense } from './useDeletePersonalExpense';
export function useDeleteExpenseMutation(menu, errorMessage, selectedExpense) {
    const group = useDeleteExpense(menu, errorMessage, selectedExpense);
    const nonGroup = useDeleteNonGroupExpense(menu, errorMessage, selectedExpense);
    const personal = useDeletePersonalExpense(menu, errorMessage, selectedExpense);
    if (selectedExpense.value?.transactionType === TransactionType.Group) {
        return group;
    }
    else if (selectedExpense.value?.transactionType === TransactionType.NonGroup) {
        return nonGroup;
    }
    else {
        return personal;
    }
}
