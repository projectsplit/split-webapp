import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { UpdateNotificationRequest, UserInfo } from "../../types";
import { apiClient } from "../apiClients";

export const useLastViewedNotification = (pageSize: number) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string | undefined>({
    mutationFn: (timestamp) => {
      if (!timestamp) {
        return Promise.resolve(null); // or simply return null
      }
      return updateLastViewedNotification({ timestamp });
    },
    onSuccess: async () => {
      const currentUserInfo = queryClient.getQueryData<UserInfo>(["getMe"]);
      if (currentUserInfo) {
        queryClient.setQueryData<UserInfo>(["getMe"], {
          ...currentUserInfo,
          hasNewerNotifications: false,
        });
      }
      queryClient.refetchQueries({
        queryKey:["userInvitations", pageSize] 
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
