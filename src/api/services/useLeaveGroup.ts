import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useLeaveGroup = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  noGroupError:Signal<string>,
  navigate: NavigateFunction
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError>({
    mutationFn: () => {
      if (!groupId) {
        noGroupError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      return leaveGroup(groupId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      menu.value = null;
      navigate("/groups")
    },
  });
};

const leaveGroup = async (
  groupId: string
): Promise<void> => {

  const response = await apiClient.post<void, AxiosResponse<void>>(
    `/groups/${groupId}/leave`,
   
  );
  return response.data;
};
