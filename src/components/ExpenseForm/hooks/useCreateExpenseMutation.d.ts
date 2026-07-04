import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { ExpenseRequest, Group, Guest, Member, User } from '@/types';
export declare const useCreateExpenseMutation: (menu: Signal<string | null>, groupId: string | undefined, navigate: NavigateFunction, setIsSubmitting: (value: boolean) => void, makePersonalClicked: boolean, nonGroupUsers: Signal<User[]>, fromHomeGroup: Signal<Group | null> | undefined, groupMembers: Signal<(Member | Guest)[]>, fromHome: boolean | undefined, isnonGroupExpense: Signal<boolean> | undefined, isPersonal: Signal<boolean> | undefined) => {
    mutate: (req: ExpenseRequest) => void;
    isPending: boolean;
};
