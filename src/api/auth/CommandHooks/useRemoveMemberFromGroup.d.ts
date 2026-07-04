import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useRemoveMemberFromGroup: (groupId: string | undefined, noGroupError: Signal<string>, noMemberError: Signal<string>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, string, unknown>;
