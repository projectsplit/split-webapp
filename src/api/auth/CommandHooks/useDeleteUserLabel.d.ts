import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useDeleteUserLabel: (errorMessage: Signal<string>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, {
    labelId: string;
}, unknown>;
