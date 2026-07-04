import { DebtsResponse, Mode } from '@/types';
import { Signal } from '@preact/signals-react';
import { ExpenseParsedFilters, TransferParsedFilters } from '../../../types';
declare const useNonGroupDebts: (mode: Mode, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>) => import("@tanstack/react-query").UseQueryResult<DebtsResponse, Error>;
export default useNonGroupDebts;
