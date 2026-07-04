import { DebtsResponse, ExpenseParsedFilters, TransferParsedFilters } from '../../../types';
import { Signal } from '@preact/signals-react';
declare const useGroupDebts: (groupId: string | undefined, expenseParsedFilters?: Signal<ExpenseParsedFilters>, transferParsedFilters?: Signal<TransferParsedFilters>) => import("@tanstack/react-query").UseQueryResult<DebtsResponse, Error>;
export default useGroupDebts;
