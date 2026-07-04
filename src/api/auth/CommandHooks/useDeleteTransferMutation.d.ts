import { Signal } from '@preact/signals-react';
import { TransferResponseItem } from '../../../types';
export declare function useDeleteTransferMutation(menu: Signal<string | null>, errorMessage: Signal<string>, selectedTransfer: Signal<TransferResponseItem | null>): import("@tanstack/react-query").UseMutationResult<any, import("axios").AxiosError<unknown, any>, string, unknown>;
