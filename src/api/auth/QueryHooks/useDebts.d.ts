import { Signal } from '@preact/signals-react';
import { ExpenseParsedFilters, Mode, TransferParsedFilters } from '../../../types';
export declare const useDebts: (mode: Mode, groupId?: string, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>) => import("@tanstack/react-query").UseQueryResult<import("../../../types").DebtsResponse, Error>;
