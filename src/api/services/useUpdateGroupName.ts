import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { UpdateGroupNameRequest } from "../../types";
import { Signal } from "@preact/signals-react";

export const useUpdateGroupName = (
  groupId: string|undefined,
  changeNameError: Signal<string>,
  menu: Signal<string | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (name) => {
      if (!groupId) {
        changeNameError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      return updateGroupName({ name }, groupId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: [groupId], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      menu.value = null;
    },
    onError: (err) => {
      const error = err as AxiosError;

      changeNameError.value = String(error.response?.data);
    },
  });
};

const updateGroupName = async (
  req: UpdateGroupNameRequest,
  groupId: string
): Promise<void> => {

  const response = await apiClient.put<void, AxiosResponse<void>>(
    `/groups/${groupId}/name`,
    req
  );
  return response.data;
};
