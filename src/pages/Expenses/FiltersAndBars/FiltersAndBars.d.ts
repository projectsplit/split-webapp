import { ExpenseParsedFilters, GetLabelsResponse, Group, Mode, TruncatedMember } from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';
interface FiltersAndBarsProps {
    expenseParsedFilters: Signal<ExpenseParsedFilters>;
    allParticipants: TruncatedMember[];
    group: Group;
    queryClient: QueryClient;
    mode: Mode;
    menu: Signal<string | null>;
    totalsAreFetching: boolean;
    totalExpense: number;
    userExpense: number;
    currency: string;
    fetchedUserAndGroupLabels: GetLabelsResponse | undefined;
}
export declare const FiltersAndBars: ({ expenseParsedFilters, allParticipants, group, queryClient, mode, menu, totalsAreFetching, totalExpense, userExpense, currency, fetchedUserAndGroupLabels, }: FiltersAndBarsProps) => import("react/jsx-runtime").JSX.Element;
export {};
