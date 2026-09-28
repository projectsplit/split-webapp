import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Permanent once the app is published — Play Store listings cannot change their applicationId.
  appId: 'com.buqs',
  appName: 'Buqs',
  webDir: 'dist',
  android: {
    // The web layer is served from https://localhost inside the app rather than file://, so
    // secure-context APIs (crypto.subtle, service worker registration, geolocation) stay available
    // and cookies behave. The server must allow this as a CORS origin.
    androidScheme: 'https',
  },
  plugins: {
    PushNotifications: {
      // The system tray is the only place a background FCM message can surface, since the web
      // layer is not running to draw anything itself.
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
