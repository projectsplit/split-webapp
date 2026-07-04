import { FormExpense, Guest, Member, PickerMember, User } from '../../../types';
export declare const createPayerPickerArray: (groupMembers: (Member | Guest)[], nonGroupUsers: User[], expense: FormExpense | null, type: string, isCreateExpense: boolean, userId: string, userMemberId: string | undefined, isnonGroupExpense?: boolean, currentAmount?: string) => PickerMember[];
