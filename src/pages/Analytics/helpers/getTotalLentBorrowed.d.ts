import { SpendingChartsResponse } from '../../../types';
export declare const getTotalLentBorrowed: (backendData: SpendingChartsResponse | undefined, currency: string) => {
    totalLent: number[];
    totalBorrowed: number[];
};
