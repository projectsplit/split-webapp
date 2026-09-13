import { AxiosResponse } from 'axios';
import { apiClient } from '../api/apiClients';
import { GetVapidPublicKeyResponse } from '../types';

export const isPushSupported = () =>
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const registerSubscriptionWithServer = async (
  subscription: PushSubscription
) => {
  const json = subscription.toJSON();

  await apiClient.post('/notifications/subscribe', {
    endpoint: subscription.endpoint,
    p256dh: json.keys?.p256dh,
    auth: json.keys?.auth,
  });
};

export type PushSubscribeFailure =
  | 'unsupported'
  | 'permission-denied'
  | 'permission-dismissed'
  | 'not-configured'
  | 'failed';

type PushSubscribeResult =
  | { subscribed: true }
  | { subscribed: false; failure: PushSubscribeFailure };

export const subscribeToPush = async (): Promise<PushSubscribeResult> => {
  if (!isPushSupported()) return { subscribed: false, failure: 'unsupported' };

  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    return {
      subscribed: false,
      failure:
        permission === 'denied' ? 'permission-denied' : 'permission-dismissed',
    };
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const { data } = await apiClient.get<
        void,
        AxiosResponse<GetVapidPublicKeyResponse>
      >('/notifications/vapid-public-key');

      if (!data.publicKey) {
        return { subscribed: false, failure: 'not-configured' };
      }

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          data.publicKey
        ) as BufferSource,
      });
    }

    await registerSubscriptionWithServer(subscription);

    return { subscribed: true };
  } catch (error) {
    console.error('Failed to subscribe this device to push:', error);
    return { subscribed: false, failure: 'failed' };
  }
};

export const unsubscribeFromPush = async (): Promise<void> => {
  if (!isPushSupported()) return;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) return;

  try {
    await apiClient.post('/notifications/unsubscribe', {
      endpoint: subscription.endpoint,
    });
  } finally {
    await subscription.unsubscribe();
  }
};

export const syncPushSubscription = async (): Promise<void> => {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  const result = await subscribeToPush();

  if (!result.subscribed) {
    console.error('Failed to sync push subscription:', result.failure);
  }
};
