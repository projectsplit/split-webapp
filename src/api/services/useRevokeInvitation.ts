import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation } from "@tanstack/react-query";

export const useRevokeInvitation = () => {
  
  return useMutation<any, Error, { receiverId: string; groupId: string; onSuccess: () => void }>({
    mutationFn: ({ receiverId, groupId }) => revokeInvitation({ receiverId, groupId }),
    onSuccess: (_, variables) => {
      variables.onSuccess()
    },
    onError: (error) => {
      console.error("Failed to revoke invitation", error);
    },
  });
};

const revokeInvitation = async (req: RevokeInvitationRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/revoke", req);
};

type RevokeInvitationRequest = {
  receiverId: string
  groupId: string
};