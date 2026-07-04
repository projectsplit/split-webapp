import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useChangeGroupCurrency: (groupId: string | undefined, noGroupFoundError: Signal<string>, refetchQueries: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, string, unknown>;
