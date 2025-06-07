import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useLeaveGroup = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  groupError: Signal<string>,
  navigate: NavigateFunction,
  openGroupOptionsMenu: Signal<boolean>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError>({
    mutationFn: () => {
      if (!groupId) {
        groupError.value = "Could not find your group. Please try again.";
        return Promise.reject(new Error("No group found"));
      }
      return leaveGroup(groupId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      menu.value = null;
      openGroupOptionsMenu.value=false
      navigate("/groups");
    },
    onError: (error: AxiosError) => {
      // console.log("Error response data:", error.response?.data);
      if (error.response?.status === 400) {
        // console.log( typeof error.response.data === "string", error.response.data)
        groupError.value =
          typeof error.response.data === "string"
            ? (groupError.value = error.response.data)
            : (groupError.value = "Something went wrong. Please try again");
           
      }
    },
  });
};

const leaveGroup = async (groupId: string): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    `/groups/${groupId}/leave`
  );
  return response.data;
};
