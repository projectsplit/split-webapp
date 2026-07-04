import { Signal } from '@preact/signals-react';
import { TransferParsedFilters, Group, TruncatedMember } from '@/types';
import { QueryClient } from '@tanstack/react-query';
interface FiltersAndBarsInterface {
    transferParsedFilters: Signal<TransferParsedFilters>;
    allParticipants: TruncatedMember[];
    group: Group;
    queryClient: QueryClient;
    menu: Signal<string | null>;
    currency: string;
    totalsAreFetching: boolean;
    userConvertedTotalReceived: number | undefined;
    userConvertedTotalSent: number | undefined;
}
export declare const FiltersAndBars: ({ transferParsedFilters, allParticipants, group, queryClient, menu, currency, totalsAreFetching, userConvertedTotalReceived, userConvertedTotalSent, }: FiltersAndBarsInterface) => import("react/jsx-runtime").JSX.Element;
export {};
