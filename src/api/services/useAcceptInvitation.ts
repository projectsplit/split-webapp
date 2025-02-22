import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAcceptInvitation = () => {
  
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: invitationId => acceptInvitation({ invitationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInvitations"], exact: false });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const acceptInvitation = async (req: AcceptInvitationRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/accept", req);
};

type AcceptInvitationRequest = {
  invitationId: string
};