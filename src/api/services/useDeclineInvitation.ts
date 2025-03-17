import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeclineInvitation = () => {

  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: invitationId => declineInvitation({ invitationId }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["userInvitations"], exact: false });

      queryClient.refetchQueries({ queryKey: ["userInvitations"], exact: false });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const declineInvitation = async (req: DeclineInvitationRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/decline", req);
};

type DeclineInvitationRequest = {
  invitationId: string
};