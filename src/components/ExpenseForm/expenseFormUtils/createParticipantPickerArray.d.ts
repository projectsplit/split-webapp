import { FormExpense, Guest, Member, PickerMember, User } from '../../../types';
export declare const createParticipantPickerArray: (groupMembers: (Member | Guest)[], nonGroupUsers: User[], expense: FormExpense | null, type: string, isCreateExpense: boolean, isnonGroupExpense?: boolean) => PickerMember[];
