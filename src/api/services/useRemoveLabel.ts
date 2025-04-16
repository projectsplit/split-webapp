import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetLabelsResponse } from "./useGetGroupLabels";

export const useRemoveLabel = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { groupId: string; labelId: string }>({
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
  });
};

const removeLabel = async (groupId: string, labelId: string): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(`/groups/${groupId}/remove-label`, { labelId });
};
