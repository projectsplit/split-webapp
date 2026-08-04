import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '../../../types';
import { setPushNotificationsEnabled } from '../api';
import {
  PushSubscribeFailure,
  subscribeToPush,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';

export type SetPushNotificationsResult = {
  enabled: boolean;
  /** Null when the toggle did what was asked. Set when enabling could not go through. */
  failure: PushSubscribeFailure | null;
};

/**
 * Toggles push notifications for the account and keeps this device's subscription in step.
 *
 * Enabling needs a working device subscription first: without one the server preference would be
 * on while nothing could ever be delivered. When that cannot be arranged the preference is left
 * untouched and the reason is handed back, so the caller can explain the switch snapping off
 * instead of leaving the user to guess.
 */
export const useSetPushNotificationsEnabled = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getMe'];

  return useMutation<
    SetPushNotificationsResult,
    AxiosError,
    boolean,
    { previousUserInfo: UserInfo | undefined }
  >({
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
      // A denied permission prompt is not an error, but the optimistic update above already
      // flipped the switch on, so put it back.
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
