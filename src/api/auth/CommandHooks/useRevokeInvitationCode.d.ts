import { Signal } from '@preact/signals-react';
export declare const useRevokeInvitationCode: (groupId: string, pageSize: number, invitationCode: string | null, mostRecentCodeHasBeenRevoked: Signal<boolean>) => import("@tanstack/react-query").UseMutationResult<any, Error, {
    code: string;
}, unknown>;
