import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useDeleteGroupLabel: (errorMessage: Signal<string>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, {
    groupId: string | undefined;
    labelId: string;
}, unknown>;
