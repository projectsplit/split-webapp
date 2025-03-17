import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation } from "@tanstack/react-query";

export const useSendInvitation = () => {
  return useMutation<
    any,
    Error,
    {
      receiverId: string;
      groupId: string;
      guestId: string | null;
      onSuccess: () => void;
    }
  >({
    mutationFn: ({ receiverId, groupId, guestId }) =>
      sendInvitation({ receiverId, groupId, guestId }),
    onSuccess: (_, variables) => {
      variables.onSuccess();
    },
    onError: (error) => {
      console.error("Failed to send invitation", error);
    },
  });
};

const sendInvitation = async (req: SendInvitationRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/send", req);
};

type SendInvitationRequest = {
  receiverId: string;
  groupId: string;
  guestId: string | null;
};
