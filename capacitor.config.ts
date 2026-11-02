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
    SocialLogin: {
      // Google is the only provider the app signs in with. Left at its default, Facebook would ship
      // the whole Facebook SDK, and the plugin's ProGuard rules keep every class of it, so R8 could
      // not remove any of it. The plugin's sync hook reads this, so it takes effect on `cap sync`.
      providers: { google: true, facebook: false },
    },
  },
};

export default config;
