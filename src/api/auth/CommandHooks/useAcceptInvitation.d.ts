import { GetUserInvitationsResponse, Invitation } from '../../../types';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
export declare const useAcceptInvitation: (navigate: NavigateFunction, invitation: Invitation, menu: Signal<string | null>) => import("@tanstack/react-query").UseMutationResult<any, Error, string, {
    previousInvitations?: {
        pages: GetUserInvitationsResponse[];
        pageParams: any[];
    };
}>;
