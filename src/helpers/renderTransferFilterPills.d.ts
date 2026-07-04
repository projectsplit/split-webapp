import { Signal } from '@preact/signals-react';
import { Group, TransferParsedFilters, TruncatedMember } from '../types';
import { QueryClient } from '@tanstack/react-query';
export declare const renderTransferFilterPills: (transferParsedFilters: Signal<TransferParsedFilters>, allParticipants: TruncatedMember[], group: Group, queryClient: QueryClient) => import("react/jsx-runtime").JSX.Element[];
