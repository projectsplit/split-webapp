import { ExpenseParsedFilters, GetLabelsResponse, Group, Mode, TruncatedMember } from '@/types';
import { Signal } from '@preact/signals-react';
import { QueryClient } from '@tanstack/react-query';
interface NoExpensesFoundInterface {
    expenseParsedFilters: Signal<ExpenseParsedFilters>;
    allParticipants: TruncatedMember[];
    group: Group | null;
    queryClient: QueryClient;
    mode: Mode;
    fetchedUserAndGroupLabels: GetLabelsResponse | undefined;
}
export declare const NoExpensesFound: ({ expenseParsedFilters, allParticipants, group, queryClient, mode, fetchedUserAndGroupLabels, }: NoExpensesFoundInterface) => import("react/jsx-runtime").JSX.Element;
export {};
