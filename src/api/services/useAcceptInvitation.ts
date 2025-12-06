import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserInvitationsResponse, Invitation } from "../../types";
import { NavigateFunction } from "react-router-dom";
import { Signal } from "@preact/signals-react";

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
    onMutate: async (invitationId) => {
      await queryClient.cancelQueries({ queryKey: ["userInvitations"] });

      const previousInvitations = queryClient.getQueryData<{
        pages: GetUserInvitationsResponse[];
        pageParams: any[];
      }>(["userInvitations", 10]);

      queryClient.setQueryData(
        ["userInvitations", 10],
        (
          old:
            | { pages: GetUserInvitationsResponse[]; pageParams: any[] }
            | undefined
        ) => {
          if (!old) return old;

          let newPages = old.pages.map((page) => ({
            ...page,
            invitations: page.invitations.filter(
              (inv) => inv.id !== invitationId
            ),
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
      navigate(`/groups/${invitation.groupId}/expenses`);
      menu.value=null
    },
    onError: (error, invitationId, context) => {
      // Rollback to the previous state if the mutation fails
      queryClient.setQueryData(
        ["userInvitations", 10],
        context?.previousInvitations
      );
      queryClient.invalidateQueries({
        queryKey: ["userInvitations"],
        exact: false,
      });
      console.error(error);
    },
    onSettled: () => {
      // Optionally refetch to ensure the data is fully up-to-date (runs in background)
      queryClient.refetchQueries({
        queryKey: ["userInvitations"],
        exact: false,
      });
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
