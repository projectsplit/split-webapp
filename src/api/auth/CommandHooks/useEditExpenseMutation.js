import { TransactionType, } from '@/types';
import { useEditNonGroupExpense } from './useEditNonGroupExpense';
import { useEditExpense } from './useEditExpense';
import { useEditPersonalExpense } from './useEditPersonalExpense';
export const useEditExpenseMutation = (menu, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked, isNonGroupExpense, selectedExpense) => {
    const group = useEditExpense(menu, selectedExpense?.value?.groupId, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked, isNonGroupExpense, selectedExpense);
    const nonGroup = useEditNonGroupExpense(menu, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked, isNonGroupExpense, selectedExpense);
    const personal = useEditPersonalExpense(menu, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked, isNonGroupExpense, selectedExpense);
    if (selectedExpense?.value?.transactionType === TransactionType.Group) {
        return group;
    }
    else if (selectedExpense?.value?.transactionType === TransactionType.NonGroup) {
        return nonGroup;
    }
    else {
        return personal;
    }
};
