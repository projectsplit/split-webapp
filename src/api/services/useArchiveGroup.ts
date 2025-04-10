import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ArchiveGroupRequest } from "../../types";
import { Signal } from "@preact/signals-react";
export const useArchiveGroup = (
  groupId: string | undefined,
  noGroupFoundError: Signal<string>,
  menu: Signal<string | null>,
 
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, boolean>({
    mutationFn: (isArchived) => {
      if (!groupId) {
        noGroupFoundError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      return archiveGroup({ isArchived }, groupId);
    },
    onSuccess: async (_data, isArchived: boolean) => {
      await queryClient.refetchQueries({ queryKey: ["groups", "active"], exact: true });
      await queryClient.refetchQueries({ queryKey: ["groups", "archived"], exact: true });
      await queryClient.refetchQueries({ queryKey: ["mostRecentGroup"], exact: false });
      menu.value = null;
    },
  });
};

const archiveGroup = async (
  req: ArchiveGroupRequest,
  groupId: string
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    `/groups/${groupId}/archive`,
    req
  );
  return response.data;
};
