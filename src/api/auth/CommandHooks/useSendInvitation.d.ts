import { Signal } from '@preact/signals-react';
export declare const useSendInvitation: (userInvitationSent: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    receiverId: string;
    groupId: string;
    guestId: string | null;
    guestName: string | null;
    onSuccess: () => void;
}, unknown>;
