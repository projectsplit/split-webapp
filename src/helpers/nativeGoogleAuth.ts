import { SocialLogin } from '@capgo/capacitor-social-login';
import config from '../config';
import { isNativeApp } from './platform';

let initialization: Promise<void> | null = null;

/**
 * Initialization is per process, not per sign-in attempt, and calling it twice throws on Android.
 * The promise is cached rather than a boolean so that two taps landing at once await the same
 * initialization instead of racing into a second one.
 */
const ensureInitialized = (): Promise<void> => {
  initialization ??= SocialLogin.initialize({
    google: {
      // Deliberately the *web* client ID, not an Android one. Google mints the id token with this
      // as its audience, which is exactly what the server already checks for the browser flow, so
      // both sign-in paths verify against one client ID and the server needs no per-platform case.
      webClientId: config.googleApiClientId,
    },
  });

  return initialization;
};

export type NativeGoogleSignInResult =
  | { ok: true; idToken: string }
  | { ok: false; cancelled: boolean };

/**
 * Opens Google's native account sheet and returns the identity token it issues. Nothing here proves
 * anything on its own — the token is only an assertion until the server verifies its signature.
 */
export const signInWithGoogleNatively =
  async (): Promise<NativeGoogleSignInResult> => {
    if (!isNativeApp()) return { ok: false, cancelled: false };

    try {
      await ensureInitialized();

      const { result } = await SocialLogin.login({
        provider: 'google',
        options: { scopes: ['email', 'profile'] },
      });

      // The offline shape carries a serverAuthCode instead of a token. We never ask for it, but the
      // union permits it, so narrow rather than assume.
      if (result.responseType !== 'online' || !result.idToken) {
        return { ok: false, cancelled: false };
      }

      return { ok: true, idToken: result.idToken };
    } catch (error) {
      // Dismissing the sheet throws here just as a real failure does. Treating the two alike would
      // show an error every time someone changed their mind, so cancellation is reported separately.
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      const cancelled =
        message.includes('cancel') || message.includes('canceled');

      if (!cancelled) {
        console.error('Native Google sign-in failed:', error);
      }

      return { ok: false, cancelled };
    }
  };
