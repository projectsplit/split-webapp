import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserInvitationsResponse } from "../../types";

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string,{ previousInvitations?: { pages: GetUserInvitationsResponse[]; pageParams: any[] } }>({
    mutationFn: (invitationId) => acceptInvitation({ invitationId }),
    onMutate: async (invitationId) => {
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
      queryClient.invalidateQueries({
        queryKey: ["userInvitations"],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
    },
    onError: (error, invitationId, context) => {
      // Rollback to the previous state if the mutation fails
      queryClient.setQueryData(["userInvitations", 10], context?.previousInvitations);
      queryClient.invalidateQueries({ queryKey: ["userInvitations"], exact: false });
      console.error(error);
    },
    onSettled: () => {
      // Optionally refetch to ensure the data is fully up-to-date (runs in background)
      queryClient.refetchQueries({ queryKey: ["userInvitations"], exact: false });
    },
  });
};

const acceptInvitation = async (
  req: AcceptInvitationRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/invitations/accept", req);
};

type AcceptInvitationRequest = {
  invitationId: string;
};
