import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";

export const useSendInvitation = (userInvitationSent: Signal<boolean>) => {
  return useMutation<
    any,
    Error,
    {
      receiverId: string;
      groupId: string;
      guestId: string | null;
      guestName:string | null;
      onSuccess: () => void;
    }
  >({
    mutationFn: ({ receiverId, groupId, guestId,guestName }) =>
      sendInvitation({ receiverId, groupId, guestId,guestName }),
    onSuccess: (_, variables) => {
      variables.onSuccess();
      userInvitationSent.value=true
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
  guestName:string| null
};
