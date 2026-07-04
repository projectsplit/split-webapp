import { GetUserInvitationsResponse } from '../../../types';
export declare const useDeclineInvitation: () => import("@tanstack/react-query").UseMutationResult<any, Error, string, {
    previousInvitations?: {
        pages: GetUserInvitationsResponse[];
        pageParams: any[];
    };
}>;
