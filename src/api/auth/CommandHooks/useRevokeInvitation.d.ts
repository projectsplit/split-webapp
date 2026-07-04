import { Signal } from '@preact/signals-react';
export declare const useRevokeInvitation: (userInvitationSent: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    receiverId: string;
    groupId: string;
    onSuccess: () => void;
}, unknown>;
