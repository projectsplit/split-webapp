import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UpdateMostRecentContextRequest } from "../../../types";
import { apiClient } from "../../apiClients";

export const useMostRecentContext = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (contextId) => updateMostRecentContext({contextId}),
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

const updateMostRecentContext = async (
  req: UpdateMostRecentContextRequest
): Promise<void> => {
  console.log(req);
  const response = await apiClient.put<void, AxiosResponse<void>>(
    "/users/activity/recent-context",
    req
  );
  return response.data;
};
