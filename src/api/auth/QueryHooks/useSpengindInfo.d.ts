import { Frequency, SpendingInfoResponse } from '../../../types';
export declare const useSpendingInfo: (budgetFrequency: Frequency, currency: string) => import("@tanstack/react-query").UseQueryResult<SpendingInfoResponse, Error>;
