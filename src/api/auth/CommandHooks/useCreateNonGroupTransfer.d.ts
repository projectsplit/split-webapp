import { AxiosError } from 'axios';
import { CreateTransferRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useCreateNonGroupTransfer: (menu: Signal<string | null>, navigate: NavigateFunction, isSubmitting: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, CreateTransferRequest, unknown>;
