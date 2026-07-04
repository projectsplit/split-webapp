import { Signal } from '@preact/signals-react';
import { ExpenseParsedFilters, Group, Mode, UserInfo } from '@/types';
export declare const useExpenseTotals: (group: Group | null, mode: Mode, userInfo: UserInfo, userMemberId: string | undefined, expenseParsedFilters: Signal<ExpenseParsedFilters>) => {
    totalsAreFetching: boolean;
    groupTotalsByCurrency: Record<string, number>;
    userTotalsByCurrency: Record<string, number>;
    totalFromAllExpensesConverted: number;
    totalFromUserExpensesConverted: number;
};
