import { Signal } from '@preact/signals-react';
import { ExpenseParsedFilters, GetLabelsResponse, Group, Mode, TruncatedMember } from '../types';
import { QueryClient } from '@tanstack/react-query';
export declare const renderExpenseFilterPills: (expenseParsedFilters: Signal<ExpenseParsedFilters>, allParticipants: TruncatedMember[], group: Group | null, queryClient: QueryClient, mode: Mode, fetchedUserAndGroupLabels: GetLabelsResponse | undefined) => import("react/jsx-runtime").JSX.Element[];
