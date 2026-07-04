import { AxiosError } from 'axios';
import { ExpenseResponseItem, Group, Guest, Member, User, BaseExpenseRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useEditPersonalExpense: (menu: Signal<string | null>, setIsSubmitting: (value: boolean) => void, nonGroupUsers: Signal<User[]>, fromHomeGroup: Signal<Group | null> | undefined, groupMembers: Signal<(Member | Guest)[]>, makePersonalClicked: boolean, isNonGroupExpense: Signal<boolean> | undefined, selectedExpense?: Signal<ExpenseResponseItem | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, BaseExpenseRequest, unknown>;
