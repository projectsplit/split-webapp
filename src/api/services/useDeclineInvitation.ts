import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserInvitationsResponse } from "../../types";

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string, { previousInvitations?: { pages: GetUserInvitationsResponse[]; pageParams: any[] } }>({
    mutationFn: (invitationId) => declineInvitation({ invitationId }),
    onMutate: async (invitationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["userInvitations"] });

      const previousInvitations = queryClient.getQueryData<{
        pages: GetUserInvitationsResponse[];
        pageParams: any[];
      }>(["userInvitations", 10]);
      queryClient.setQueryData(["userInvitations", 10],(old: { pages: GetUserInvitationsResponse[]; pageParams: any[] } | undefined) => {
          if (!old) return old;

          let newPages = old.pages.map((page) => ({
            ...page,
            invitations: page.invitations.filter((inv) => inv.id !== invitationId),
          }));
          newPages = newPages.filter((page) => page.invitations.length > 0);
          const newPageParams = old.pageParams.slice(0, newPages.length);
          return {
            pages: newPages,
            pageParams: newPageParams,
          };
        }
      );
      return { previousInvitations };
    },
    onSuccess: () => {
   
      queryClient.refetchQueries({ queryKey: ["userInvitations"], exact: false });
    },
    onError: (error, invitationId, context) => {
      // Rollback to the previous state if the mutation fails
      queryClient.setQueryData(["userInvitations", 10], context?.previousInvitations);
      queryClient.refetchQueries({ queryKey: ["userInvitations"], exact: false });
      console.error(error);
    },
    onSettled: () => {
      // Optionally refetch to ensure the data is fully up-to-date (runs in background)
      queryClient.refetchQueries({ queryKey: ["userInvitations"], exact: false });
    },
  });
};

const declineInvitation = async (req: DeclineInvitationRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/decline", req);
};

type DeclineInvitationRequest = {
  invitationId: string
};