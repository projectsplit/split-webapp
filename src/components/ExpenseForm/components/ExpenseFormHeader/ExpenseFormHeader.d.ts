import { Signal } from '@preact/signals-react';
import { Group, Guest, Member, User } from '@/types';
interface ExpenseFormHeaderProps {
    header: string;
    isnonGroupExpense?: Signal<boolean>;
    fromHome?: boolean;
    nonGroupUsers: Signal<User[]>;
    groupMembers: Signal<(Member | Guest)[]>;
    isPersonal: Signal<boolean>;
    fromHomeGroup?: Signal<Group | null>;
    menu: Signal<string | null>;
}
export declare const ExpenseFormHeader: ({ header, isnonGroupExpense, fromHome, nonGroupUsers, groupMembers, isPersonal, fromHomeGroup, menu, }: ExpenseFormHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
