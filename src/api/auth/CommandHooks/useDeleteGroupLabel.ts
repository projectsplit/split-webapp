import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetLabelsResponse } from "@/types";
import { Signal } from "@preact/signals-react";


export const useDeleteGroupLabel = (errorMessage: Signal<string>, menu: Signal<string | null>) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { groupId: string | undefined; labelId: string }>({
    mutationFn: ({ groupId, labelId }) => removeLabel(groupId, labelId),
    onSuccess: (_, { groupId, labelId }) => {
      queryClient.setQueryData(["groupLabels", groupId], (oldData: GetLabelsResponse | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          labels: oldData.labels.filter((label) => label.id !== labelId),
        };
      });
    },
    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
      menu.value = "generalWarning"
    },
  });
};

const removeLabel = async (groupId: string | undefined, labelId: string): Promise<void> => {
  if (!groupId) {
    throw new Error("groupId is undefined");
  }

  await apiClient.post<void, AxiosResponse<void>>(`/groups/${groupId}/remove-label`, { labelId });
};
