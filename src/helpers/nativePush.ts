import { PushNotifications } from '@capacitor/push-notifications';
import { apiClient } from '../api/apiClients';
import { PushDeviceKind } from '../types';
import type { PushSubscribeResult } from './pushNotifications';

/**
 * How long to wait for FCM to hand back a registration token. register() resolves as soon as the
 * request is made, not when the token arrives, so without a bound a device that never registers
 * would leave the settings toggle spinning forever.
 */
const TOKEN_TIMEOUT_MS = 15000;

let cachedToken: string | null = null;

const requestToken = (): Promise<string | null> =>
  new Promise((resolve) => {
    let settled = false;

    const finish = (token: string | null) => {
      if (settled) return;
      settled = true;
      resolve(token);
    };

    const timer = setTimeout(() => finish(null), TOKEN_TIMEOUT_MS);

    void PushNotifications.addListener('registration', (token) => {
      clearTimeout(timer);
      finish(token.value);
    });

    void PushNotifications.addListener('registrationError', (error) => {
      console.error('FCM registration failed:', error);
      clearTimeout(timer);
      finish(null);
    });

    void PushNotifications.register();
  });

/**
 * Requests notification permission and registers this device with FCM. The WebView has no Push API,
 * so nothing about the browser path applies here: the FCM registration token takes the place of a
 * push endpoint, and the server stores it in the same device record under a different kind.
 */
export const subscribeToNativePush = async (): Promise<PushSubscribeResult> => {
  try {
    // Android 13+ shows a runtime prompt; older versions return granted without one.
    let status = await PushNotifications.checkPermissions();

    if (status.receive === 'prompt' || status.receive === 'prompt-with-rationale') {
      status = await PushNotifications.requestPermissions();
    }

    if (status.receive !== 'granted') {
      return { subscribed: false, failure: 'permission-denied' };
    }

    const token = await requestToken();

    if (!token) {
      return { subscribed: false, failure: 'failed' };
    }

    cachedToken = token;

    await apiClient.post('/notifications/subscribe', {
      endpoint: token,
      kind: PushDeviceKind.Fcm,
    });

    return { subscribed: true };
  } catch (error) {
    console.error('Failed to subscribe this device to FCM:', error);
    return { subscribed: false, failure: 'failed' };
  }
};

/** Whether this device has already granted notification permission, without prompting for it. */
export const hasNativePushPermission = async (): Promise<boolean> => {
  try {
    const status = await PushNotifications.checkPermissions();
    return status.receive === 'granted';
  } catch {
    return false;
  }
};

export const unsubscribeFromNativePush = async (): Promise<void> => {
  const token = cachedToken;

  cachedToken = null;

  try {
    if (token) {
      await apiClient.post('/notifications/unsubscribe', { endpoint: token });
    }
  } finally {
    // Drops the token so FCM stops routing to this install even if the server call failed.
    await PushNotifications.unregister();
  }
};

/**
 * Registers what happens when a notification is tapped. FCM delivers the payload's `url` in `data`,
 * matching what the service worker reads on the web, so both platforms route on the same field.
 * Called once at startup rather than per subscribe: a tap can launch the app from cold, and the
 * listener has to already exist for that delivery to be seen.
 */
export const addNativePushTapListener = (onOpenUrl: (url: string) => void) => {
  void PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (action) => {
      const url = action.notification.data?.url;

      if (typeof url === 'string' && url.length > 0) {
        onOpenUrl(url);
      }
    }
  );
};
