import { Signal } from '@preact/signals-react';
import { Group, TransferParsedFilters, TruncatedMember } from '@/types';
import { QueryClient } from '@tanstack/react-query';
interface NoTransfersFoundInterface {
    transferParsedFilters: Signal<TransferParsedFilters>;
    allParticipants: TruncatedMember[];
    group: Group;
    queryClient: QueryClient;
}
export declare const NoTransfersFound: ({ transferParsedFilters, allParticipants, group, queryClient, }: NoTransfersFoundInterface) => import("react/jsx-runtime").JSX.Element;
export {};
