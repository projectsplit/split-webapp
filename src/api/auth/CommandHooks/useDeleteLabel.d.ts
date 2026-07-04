import { Signal } from '@preact/signals-react';
export declare const useDeleteLabel: (isPersonal: boolean, errorMessage: Signal<string>, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, import("axios").AxiosError<unknown, any>, {
    labelId: string;
}, unknown> | import("@tanstack/react-query").UseMutationResult<any, import("axios").AxiosError<unknown, any>, {
    groupId: string | undefined;
    labelId: string;
}, unknown>;
