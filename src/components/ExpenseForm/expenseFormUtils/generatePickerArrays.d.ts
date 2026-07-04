import { FormExpense, Guest, Member, User, UserInfo } from '../../../types';
export declare const generatePickerArrays: (groupMembers: (Member | Guest)[], nonGroupUsers: User[], expense: FormExpense | null, isCreateExpense: boolean, userInfo: UserInfo, userMemberId: string | undefined, isnonGroupExpense?: boolean, currentAmount?: string) => {
    participantsByCategory: {
        Amounts: import("../../../types").PickerMember[];
        Shares: import("../../../types").PickerMember[];
        Percentages: import("../../../types").PickerMember[];
    };
    payersByCategory: {
        Amounts: import("../../../types").PickerMember[];
        Shares: import("../../../types").PickerMember[];
        Percentages: import("../../../types").PickerMember[];
    };
};
