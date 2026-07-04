import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
export declare const useCreateGuest: (groupId: string | undefined, noGroupError: Signal<string>, guestName: string, setGuestName: React.Dispatch<React.SetStateAction<string>>) => import("@tanstack/react-query").UseMutationResult<any, AxiosError<unknown, any>, void, unknown>;
