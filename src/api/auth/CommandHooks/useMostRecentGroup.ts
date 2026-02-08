import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UpdateMostRecentGroupRequest } from "../../../types";
import { apiClient } from "../../apiClients";

export const useMostRecentGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (groupId) => updateMostRecentGroup({ groupId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMe"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateMostRecentGroup = async (
  req: UpdateMostRecentGroupRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    "/users/activity/recent-group",
    req
  );
  return response.data;
};
