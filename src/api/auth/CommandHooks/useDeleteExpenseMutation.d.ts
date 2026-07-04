import { Signal } from '@preact/signals-react';
import { ExpenseResponseItem } from '../../../types';
export declare function useDeleteExpenseMutation(menu: Signal<string | null>, errorMessage: Signal<string>, selectedExpense: Signal<ExpenseResponseItem | null>): import("@tanstack/react-query").UseMutationResult<any, import("axios").AxiosError<unknown, any>, string, unknown>;
