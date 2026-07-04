import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
export declare const useLeaveGroup: (menu: Signal<string | null>, groupId: string | undefined, groupError: Signal<string>, navigate: NavigateFunction, openGroupOptionsMenu: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, void, unknown>;
