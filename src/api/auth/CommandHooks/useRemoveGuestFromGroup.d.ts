import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useRemoveGuestFromGroup: (groupId: string | undefined, noGroupError: Signal<string>, noMemberError: Signal<string>) => import("@tanstack/react-query").UseMutationResult<void, AxiosError<unknown, any>, string, unknown>;
