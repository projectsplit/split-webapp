import { DebtsResponse, Mode } from '@/types';
import { Signal } from '@preact/signals-react';
import { ExpenseParsedFilters } from '../../../types';
declare const useUserTotals: (mode: Mode, expenseParsedFilters?: Signal<ExpenseParsedFilters>) => import("@tanstack/react-query").UseQueryResult<DebtsResponse, Error>;
export default useUserTotals;
