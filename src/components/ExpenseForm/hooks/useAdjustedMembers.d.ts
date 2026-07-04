import { Signal } from '@preact/signals-react';
import { PickerMember, User } from '@/types';
import { SplitMethod, CategoryMap } from '@/components/ExpenseForm/formStore/formStoreTypes';
interface UseAdjustedMembersParams {
    participantsByCategory: CategoryMap<PickerMember[]>;
    payersByCategory: CategoryMap<PickerMember[]>;
    participantsCategory: Signal<SplitMethod>;
    payersCategory: Signal<SplitMethod>;
    nonGroupUsers: Signal<User[]>;
    isnonGroupExpense: Signal<boolean> | undefined;
    userInfo: {
        userId: string;
    } | undefined;
    userMemberId: string;
}
export declare function useAdjustedMembers({ participantsByCategory, payersByCategory, participantsCategory, payersCategory, nonGroupUsers, isnonGroupExpense, userInfo, userMemberId, }: UseAdjustedMembersParams): {
    participants: PickerMember[];
    payers: PickerMember[];
    adjustParticipants: PickerMember[];
    adjustPayers: PickerMember[];
};
export {};
