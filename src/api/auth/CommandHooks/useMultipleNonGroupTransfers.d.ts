import { AxiosError } from 'axios';
import { CreateTransfersRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
export declare const useMultipleNonGroupTransfers: (menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, CreateTransfersRequest, unknown>;
