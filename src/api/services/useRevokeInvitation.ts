import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";

export const useRevokeInvitation = (userInvitationSent: Signal<boolean>) => {
  
  return useMutation<any, Error, { receiverId: string; groupId: string; onSuccess: () => void }>({
    mutationFn: ({ receiverId, groupId }) => revokeInvitation({ receiverId, groupId }),
    onSuccess: (_, variables) => {
      variables.onSuccess()
      userInvitationSent.value=false
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