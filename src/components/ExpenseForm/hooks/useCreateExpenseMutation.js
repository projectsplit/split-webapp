import { useCreateGroupExpense } from '@/api/auth/CommandHooks/useCreateGroupExpense';
import { useCreateNonGroupExpense } from '@/api/auth/CommandHooks/useCreateNonGroupExpense';
import { useCreatePersonalExpense } from '@/api/auth/CommandHooks/useCreatePersonalExpense';
export const useCreateExpenseMutation = (menu, groupId, navigate, setIsSubmitting, makePersonalClicked, nonGroupUsers, fromHomeGroup, groupMembers, fromHome, isnonGroupExpense, isPersonal) => {
    const { mutate: createGroupExpenseMutation, isPending: isPendingCreateGroupExpense, } = useCreateGroupExpense(menu, groupId, navigate, setIsSubmitting, makePersonalClicked, nonGroupUsers, fromHomeGroup, groupMembers, fromHome);
    const { mutate: createNonGroupExpenseMutation, isPending: isPendingCreateNonGroupExpense, } = useCreateNonGroupExpense(menu, navigate, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked);
    const { mutate: createPersonalExpenseMutation, isPending: isPendingCreatePersonalExpense, } = useCreatePersonalExpense(menu, navigate, setIsSubmitting, makePersonalClicked);
    const mutate = (req) => {
        if (isPersonal?.value) {
            createPersonalExpenseMutation(req);
        }
        else if (isnonGroupExpense?.value) {
            createNonGroupExpenseMutation(req);
        }
        else if (groupId) {
            createGroupExpenseMutation(req);
        }
        else {
            createPersonalExpenseMutation(req);
        }
    };
    const isPending = isPersonal?.value
        ? isPendingCreatePersonalExpense
        : isnonGroupExpense?.value
            ? isPendingCreateNonGroupExpense
            : groupId
                ? isPendingCreateGroupExpense
                : isPendingCreatePersonalExpense;
    return { mutate, isPending };
};
