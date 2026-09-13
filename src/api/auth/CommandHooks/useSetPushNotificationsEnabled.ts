import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '../../../types';
import { setPushNotificationsEnabled } from '../api';
import {
  PushSubscribeFailure,
  subscribeToPush,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';

type SetPushNotificationsResult = {
  enabled: boolean;
  failure: PushSubscribeFailure | null;
};

export const useSetPushNotificationsEnabled = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getMe'];

  return useMutation<
    SetPushNotificationsResult,
    AxiosError,
    boolean,
    { previousUserInfo: UserInfo | undefined }
  >({
    meta: { errorHandled: true },
    mutationFn: async (enabled) => {
      if (enabled) {
        const result = await subscribeToPush();

        if (!result.subscribed) {
          return { enabled: false, failure: result.failure };
        }

        await setPushNotificationsEnabled({ enabled: true });

        return { enabled: true, failure: null };
      }

      await setPushNotificationsEnabled({ enabled: false });
      await unsubscribeFromPush();

      return { enabled: false, failure: null };
    },

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

    onSuccess: (result) => {
      const current = queryClient.getQueryData<UserInfo>(queryKey);

      if (current) {
        queryClient.setQueryData<UserInfo>(queryKey, {
          ...current,
          pushNotificationsEnabled: result.enabled,
        });
      }
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
