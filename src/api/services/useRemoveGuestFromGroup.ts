import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { Signal } from "@preact/signals-react";
import { Group } from "../../types";

export const useRemoveGuestFromGroup = (
  groupId: string | undefined,
  noGroupError:Signal<string>,
  noMemberError:Signal<string>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (guestId) => {
      if (!groupId) {
        noGroupError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      if (!guestId) {
        noMemberError.value = "No member found";
        return Promise.reject(new Error("No member found"));
      }
      return removeGuest({guestId}, groupId);
    },
    onSuccess: async (_,guestId:string) => {
      const previousGroup:Group|undefined = queryClient.getQueryData([groupId]);
      if (previousGroup) {
        queryClient.setQueryData([groupId], {
          ...previousGroup,
          guests: previousGroup.guests.filter((m) => m.id !== guestId),
        });
      }
      
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["debts", groupId], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Failed to remove guest:", error.message);
      noMemberError.value = "Failed to remove guest. Please try again.";
    }
  });

};

const removeGuest = async (
  req: {guestId:string},
  groupId: string
): Promise<void> => {

  const response = await apiClient.post<void, AxiosResponse<void>>(
    `/groups/${groupId}/remove-guest`,
    req
  );

  return response.data;
};
