import { Signal } from '@preact/signals-react';
export declare const useJoinWithCode: (errorMessage: Signal<string>) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    code: string;
    onSuccess: () => void;
}, unknown>;
