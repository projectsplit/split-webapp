import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem, Mode, FormExpense, Group, TruncatedMember, User } from '../../types';
export declare const buildFormExpense: (selectedExpense: Signal<ExpenseResponseItem | undefined | null>, mode: Mode, group: Group | undefined) => FormExpense | undefined;
export declare const toUser: (member: TruncatedMember) => User;
