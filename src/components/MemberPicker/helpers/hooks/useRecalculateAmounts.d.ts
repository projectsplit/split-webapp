import { Guest, Member, PickerMember, User } from '../../../../types';
import { Signal } from '@preact/signals-react';
export declare const useRecalculateAmounts: (memberAmounts: PickerMember[], setMemberAmounts: (newMembers: PickerMember[]) => void, totalAmount: number, userMemberId: string | undefined, decimalDigits: number, description: string, renderCounter: React.MutableRefObject<number>, category: Signal<string>, ticker: string, userId: string, groupMembers: Signal<(Member | Guest)[]>, nonGroupUsers: Signal<User[]>, isCreateExpense: boolean, isnonGroupExpense?: Signal<boolean>) => void;
