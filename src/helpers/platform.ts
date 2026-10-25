import { Capacitor } from '@capacitor/core';

/**
 * True only inside the packaged Android/iOS shell. The same bundle also runs as the ordinary web
 * PWA, so every native-only path has to be gated rather than assumed: on web the Capacitor
 * plugins are unimplemented stubs that throw when called.
 */
export const isNativeApp = (): boolean => Capacitor.isNativePlatform();

export const isAndroidApp = (): boolean => Capacitor.getPlatform() === 'android';
