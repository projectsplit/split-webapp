import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '../../../types';
import { setPushNotificationsEnabled } from '../api';
import {
  subscribeToPush,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';

/**
 * Toggles push notifications for the account and keeps this device's subscription in step.
 *
 * Enabling needs the browser permission prompt to succeed first: without a subscription the
 * server preference would be on while nothing could ever be delivered. A refused prompt
 * therefore leaves the preference untouched and resolves false.
 */
export const useSetPushNotificationsEnabled = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getMe'];

  return useMutation<
    boolean,
    AxiosError,
    boolean,
    { previousUserInfo: UserInfo | undefined }
  >({
    mutationFn: async (enabled) => {
      if (enabled) {
        const subscribed = await subscribeToPush();

        if (!subscribed) return false;

        await setPushNotificationsEnabled({ enabled: true });

        return true;
      }

      await setPushNotificationsEnabled({ enabled: false });
      await unsubscribeFromPush();

      return false;
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

    onSuccess: (enabled) => {
      // A denied permission prompt is not an error, but the optimistic update above already
      // flipped the switch on, so put it back.
      const current = queryClient.getQueryData<UserInfo>(queryKey);

      if (current) {
        queryClient.setQueryData<UserInfo>(queryKey, {
          ...current,
          pushNotificationsEnabled: enabled,
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
