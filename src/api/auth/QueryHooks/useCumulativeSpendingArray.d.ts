import { SpendingChartsResponse } from '../../../types';
export declare const useCumulativeSpendingArray: (startDate: string, endDate: string, currency: string, granularity: number) => import("@tanstack/react-query").UseQueryResult<SpendingChartsResponse, Error>;
