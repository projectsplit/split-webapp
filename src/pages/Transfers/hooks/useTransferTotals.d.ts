import { Signal } from '@preact/signals-react';
import { Mode, TransferParsedFilters, Group, UserInfo } from '@/types';
export declare const useTransferTotals: (group: Group | null, mode: Mode, userInfo: UserInfo, transferParsedFilters: Signal<TransferParsedFilters>) => {
    totalsAreFetching: boolean;
    userTotalSentByCurr: Record<string, number>;
    userTotalReceivedByCurr: Record<string, number>;
    userConvertedTotalReceived: number | undefined;
    userConvertedTotalSent: number | undefined;
};
