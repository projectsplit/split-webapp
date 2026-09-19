import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  removeInvitationFromCache,
  restoreInvitationsCache,
} from '../helpers/invitationsCache';
import { GetUserInvitationsResponse } from '../../../types';

export const useDeclineInvitation = () => {
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
    mutationFn: (invitationId) => declineInvitation({ invitationId }),
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
    },
    onError: (error, invitationId, context) => {
      restoreInvitationsCache(queryClient, context?.previousInvitations);
      queryClient.refetchQueries({
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

const declineInvitation = async (
  req: DeclineInvitationRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>('/invitations/decline', req);
};

type DeclineInvitationRequest = {
  invitationId: string;
};
