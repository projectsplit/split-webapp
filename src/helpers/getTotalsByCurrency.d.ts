import { TotalSpent } from '../types';
export declare function getAllCurrencyTotals(totalSpent: TotalSpent): Record<string, number>;
export declare function getCurrencyValues(totalSpent: TotalSpent, id: string | undefined): Record<string, number>;
