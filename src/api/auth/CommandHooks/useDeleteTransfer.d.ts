import { AxiosError } from 'axios';
import { TransferResponseItem } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useDeleteTransfer: (menu: Signal<string | null>, errorMessage: Signal<string>, selectedTransfer: Signal<TransferResponseItem | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, string, unknown>;
