import { AxiosError } from 'axios';
import { GroupExpenseRequest, ExpenseResponseItem, Group, Guest, Member, User } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useEditExpense: (menu: Signal<string | null>, groupId: string | undefined, setIsSubmitting: (value: boolean) => void, nonGroupUsers: Signal<User[]>, fromHomeGroup: Signal<Group | null> | undefined, groupMembers: Signal<(Member | Guest)[]>, makePersonalClicked: boolean, isNonGroupExpense: Signal<boolean> | undefined, selectedExpense?: Signal<ExpenseResponseItem | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, GroupExpenseRequest, unknown>;
