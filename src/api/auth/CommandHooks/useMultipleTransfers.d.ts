import { Signal } from '@preact/signals-react';
export declare const useMultipleTransfers: (menu: Signal<string | null>, groupId?: string) => import("@tanstack/react-query").UseMutationResult<any, import("axios").AxiosError<unknown, any>, import("../../../types").CreateTransfersRequest, unknown>;
