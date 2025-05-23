import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { Signal } from "@preact/signals-react";
import { Group } from "../../types";

export const useRemoveMemberFromGroup = (
  groupId: string | undefined,
  noGroupError:Signal<string>,
  noMemberError:Signal<string>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (memberId) => {
      if (!groupId) {
        noGroupError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      if (!memberId) {
        noMemberError.value = "No member found";
        return Promise.reject(new Error("No member found"));
      }
      return removeMember({memberId}, groupId);
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({ success: true, memberId, groupId }); // Simulate a successful response
      //   }, 500); // Simulate a 500ms delay
      // });
    },
    onSuccess: async (_,memberId:string) => {
      const previousGroup:Group|undefined = queryClient.getQueryData([groupId]);
      if (previousGroup) {
        queryClient.setQueryData([groupId], {
          ...previousGroup,
          members: previousGroup.members.filter((m) => m.id !== memberId),
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
  });

};


const removeMember = async (
  req: {memberId:string},
  groupId: string
): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    `/groups/${groupId}/remove-member`,
    req
  );
  return response.data;
};
