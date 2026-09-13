import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  removeInvitationFromCache,
  restoreInvitationsCache,
} from '../helpers/invitationsCache';
import { GetUserInvitationsResponse, Invitation } from '../../../types';
import { generatePath, NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import routes from '@/routes';

export const useAcceptInvitation = (
  navigate: NavigateFunction,
  invitation: Invitation,
  menu: Signal<string | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    string,
    {
      previousInvitations?: {
        pages: GetUserInvitationsResponse[];
        pageParams: any[];
      };
    }
  >({
    mutationFn: (invitationId) => acceptInvitation({ invitationId }),
    onMutate: async (invitationId) => ({
      previousInvitations: await removeInvitationFromCache(
        queryClient,
        invitationId
      ),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userInvitations'],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['shared'], exact: false });
      navigate(
        generatePath(routes.GROUP_EXPENSES, { groupid: invitation.groupId })
      );
      menu.value = null;
    },
    onError: (error, _invitationId, context) => {
      restoreInvitationsCache(queryClient, context?.previousInvitations);
      queryClient.invalidateQueries({
        queryKey: ['userInvitations'],
        exact: false,
      });
      console.error(error);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['userInvitations'],
        exact: false,
      });
    },
  });
};

const acceptInvitation = async (
  req: AcceptInvitationRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>('/invitations/accept', req);
};

type AcceptInvitationRequest = {
  invitationId: string;
};
