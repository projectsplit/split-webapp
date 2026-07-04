import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { UserInfo } from '../../../types';
import { apiClient } from '../../apiClients';

export const useSetPushNotificationsEnabled = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getMe'];

  return useMutation<
    void,
    AxiosError,
    boolean,
    { previousUserInfo: UserInfo | undefined }
  >({
    mutationFn: (enabled) => setPushNotificationsEnabled(enabled),

    onMutate: async (enabled) => {
      await queryClient.cancelQueries({ queryKey });

      const previousUserInfo = queryClient.getQueryData<UserInfo>(queryKey);
      if (previousUserInfo) {
        queryClient.setQueryData<UserInfo>(queryKey, {
          ...previousUserInfo,
          pushNotificationsEnabled: enabled,
        });
      }
      return { previousUserInfo };
    },

    onError: (err, _enabled, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(queryKey, context.previousUserInfo);
      }
      console.error('Failed to update push notifications setting:', err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

const setPushNotificationsEnabled = async (enabled: boolean): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    '/notifications/preference',
    { enabled }
  );
  return response.data;
};
