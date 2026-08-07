import { AxiosResponse } from 'axios';
import { apiClient } from '../api/apiClients';
import { GetVapidPublicKeyResponse } from '../types';
import { isNativeApp } from './platform';
import {
  hasNativePushPermission,
  subscribeToNativePush,
  unsubscribeFromNativePush,
} from './nativePush';

export const isPushSupported = () =>
  // The native shell has no Push API at all — its WebView does not implement it — but it can still
  // receive notifications, through FCM. Reporting unsupported there would hide the settings toggle
  // on the one platform where notifications work best.
  isNativeApp() ||
  ('serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window);

// The VAPID key travels as base64url, but pushManager.subscribe wants raw bytes.
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

/**
 * Why a device could not be subscribed. Every one of these used to collapse into a bare false,
 * which the settings toggle turned into a switch that flipped itself back with no explanation —
 * indistinguishable from the feature being broken.
 */
export type PushSubscribeFailure =
  | 'unsupported'
  | 'permission-denied'
  | 'permission-dismissed'
  | 'not-configured'
  | 'failed';

export type PushSubscribeResult =
  | { subscribed: true }
  | { subscribed: false; failure: PushSubscribeFailure };

/**
 * Requests notification permission if needed and subscribes this device. Reports why it could
 * not, so the caller can say something useful rather than silently give up.
 */
export const subscribeToPush = async (): Promise<PushSubscribeResult> => {
  if (!isPushSupported()) return { subscribed: false, failure: 'unsupported' };

  if (isNativeApp()) return subscribeToNativePush();

  // Returns the standing answer without prompting when the user has already decided, so a
  // previously blocked site never gets a second prompt no matter how often this is called.
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

/** Removes this device's push subscription, both locally and on the server. */
export const unsubscribeFromPush = async (): Promise<void> => {
  if (!isPushSupported()) return;

  if (isNativeApp()) return unsubscribeFromNativePush();

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

/**
 * Re-registers this device's subscription with the server. Browsers rotate push endpoints on
 * their own, and the record is per-device, so a subscription made on one device is unknown to
 * the next. Safe to call on every app start: it does nothing unless permission is already granted.
 */
export const syncPushSubscription = async (): Promise<void> => {
  if (!isPushSupported()) return;

  const alreadyGranted = isNativeApp()
    ? await hasNativePushPermission()
    : Notification.permission === 'granted';

  if (!alreadyGranted) return;

  const result = await subscribeToPush();

  if (!result.subscribed) {
    console.error('Failed to sync push subscription:', result.failure);
  }
};
