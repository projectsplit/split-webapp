import { AxiosError } from 'axios';
import { NonGroupExpenseRequest, Group, Guest, Member, User } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useCreateNonGroupExpense: (menu: Signal<string | null>, navigate: NavigateFunction, setIsSubmitting: (value: boolean) => void, nonGroupUsers: Signal<User[]>, fromHomeGroup: Signal<Group | null> | undefined, groupMembers: Signal<(Member | Guest)[]>, makePersonalClicked: boolean) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, NonGroupExpenseRequest, unknown>;
