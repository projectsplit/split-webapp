import { AxiosError } from 'axios';
import { GroupExpenseRequest, Group, Guest, Member, User } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useCreateGroupExpense: (menu: Signal<string | null>, groupId: string | undefined, navigate: NavigateFunction, setIsSubmitting: (value: boolean) => void, makePersonalClicked: boolean, nonGroupUsers: Signal<User[]>, fromHomeGroup: Signal<Group | null> | undefined, groupMembers: Signal<(Member | Guest)[]>, fromHome: boolean | undefined) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, GroupExpenseRequest, unknown>;
