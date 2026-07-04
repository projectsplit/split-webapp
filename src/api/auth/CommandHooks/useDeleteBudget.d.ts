import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useDeleteBudget: (menu: Signal<string | null>, errorMessage: Signal<string>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, string, unknown>;
