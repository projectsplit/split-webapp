import { AxiosError } from 'axios';
import { ExpenseResponseItem } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useDeleteExpense: (menu: Signal<string | null>, errorMessage: Signal<string>, selectedExpense: Signal<ExpenseResponseItem | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, string, unknown>;
