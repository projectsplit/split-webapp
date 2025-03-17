import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UpdateNotificationRequest } from "../../types";
import { apiClient } from "../apiClients";

export const useLastViewedNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (timestamp) => updateLastViewedNotification({ timestamp }),
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: ["getMe"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateLastViewedNotification = async (
  req: UpdateNotificationRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    "/users/activity/last-viewed-notification",
    req
  );
  return response.data;
};
