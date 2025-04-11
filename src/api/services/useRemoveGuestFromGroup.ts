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

  return useMutation<any, AxiosError, string>({
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
      
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["debts", groupId], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
      await queryClient.refetchQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
    },
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
