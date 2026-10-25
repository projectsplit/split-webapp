import { registerPlugin } from '@capacitor/core';
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

interface PushAvailabilityPlugin {
  isAvailable(): Promise<{ available: boolean }>;
}

const PushAvailability =
  registerPlugin<PushAvailabilityPlugin>('PushAvailability');

let availability: Promise<boolean> | null = null;

/**
 * Whether this build of the app can reach FCM. It cannot when it was built without
 * google-services.json, and then register() and unregister() do not fail — they crash the app from
 * native code, where no try/catch here can reach. So every path that would call either asks this
 * first.
 *
 * A shell too old to have the plugin rejects the call, and that counts as no. Wrongly saying no
 * costs someone their notifications; wrongly saying yes costs them the app.
 */
export const isNativePushAvailable = (): Promise<boolean> => {
  availability ??= PushAvailability.isAvailable()
    .then((result) => result.available)
    .catch(() => false);

  return availability;
};

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
  // Before the permission prompt too: asking to send notifications that can never arrive would be
  // a prompt for nothing.
  if (!(await isNativePushAvailable())) {
    return { subscribed: false, failure: 'not-configured' };
  }

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
  // Logging out and deleting an account both come through here, so this is the guard that keeps
  // those working in a build with no Firebase. There is no registration to undo in one anyway.
  if (!(await isNativePushAvailable())) return;

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
