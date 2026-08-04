import { AxiosResponse } from 'axios';
import { apiClient } from '../api/apiClients';
import { GetVapidPublicKeyResponse } from '../types';

export const isPushSupported = () =>
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

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
 * Requests notification permission if needed and subscribes this device.
 * Returns false when push is unsupported or the permission was not granted.
 */
export const subscribeToPush = async (): Promise<boolean> => {
  if (!isPushSupported()) return false;

  const permission = await Notification.requestPermission();

  if (permission !== 'granted') return false;

  const registration = await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    const { data } = await apiClient.get<
      void,
      AxiosResponse<GetVapidPublicKeyResponse>
    >('/notifications/vapid-public-key');

    if (!data.publicKey) return false;

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        data.publicKey
      ) as BufferSource,
    });
  }

  await registerSubscriptionWithServer(subscription);

  return true;
};

/** Removes this device's push subscription, both locally and on the server. */
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

/**
 * Re-registers this device's subscription with the server. Browsers rotate push endpoints on
 * their own, and the record is per-device, so a subscription made on one device is unknown to
 * the next. Safe to call on every app start: it does nothing unless permission is already granted.
 */
export const syncPushSubscription = async (): Promise<void> => {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  try {
    await subscribeToPush();
  } catch (error) {
    console.error('Failed to sync push subscription:', error);
  }
};
