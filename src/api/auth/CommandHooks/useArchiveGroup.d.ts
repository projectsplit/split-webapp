import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useArchiveGroup: (groupId: string | undefined, noGroupFoundError: Signal<string>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, boolean, unknown>;
