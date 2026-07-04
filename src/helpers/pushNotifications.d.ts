export declare const isPushSupported: () => boolean;
/**
 * Requests notification permission (if needed) and subscribes this device.
 * Returns false when push is unsupported or the permission was not granted.
 */
export declare const subscribeToPush: () => Promise<boolean>;
/**
 * Removes this device's push subscription (both locally and on the server).
 */
export declare const unsubscribeFromPush: () => Promise<void>;
/**
 * Keeps the server in sync with this device's subscription. Safe to call on
 * every app start: it does nothing unless the user already granted permission.
 */
export declare const syncPushSubscription: () => Promise<void>;
