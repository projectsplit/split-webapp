import { Signal } from '@preact/signals-react';
import { GroupsTotalAmountsResponse } from '@/types';
export declare const useGetGroupsTotalAmounts: (pageSize: number, keyword: string, activeGroupCatAsState: Signal<string>) => import("@tanstack/react-query").UseInfiniteQueryResult<import("@tanstack/query-core").InfiniteData<GroupsTotalAmountsResponse, unknown>, Error>;
