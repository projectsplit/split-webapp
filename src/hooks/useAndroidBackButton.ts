import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { isNativeApp } from '@/helpers/platform';
import { handleBack } from '@/helpers/backHandlers';

/**
 * Makes the Android hardware back button work.
 *
 * Without this the button is dead on the app's first screen. The App plugin registers an
 * `OnBackPressedCallback` that is enabled whether or not anything is listening, so it swallows
 * every press; with no listener it goes back in the WebView's history if it can and otherwise does
 * nothing at all. Inside the app that reads as normal navigation, because React Router's pushState
 * calls give the WebView history to walk. On the screen the app opened at there is none, so back
 * silently does nothing and the only way out is Home or Recents.
 *
 * Registering a listener also takes over the navigating half: once anything is listening the plugin
 * stops calling `goBack` itself and only reports, so both branches have to be handled here.
 *
 * Menus and modals come first, before history is touched at all. They are drawn from signals rather
 * than routes, so there is no history entry behind an open menu — going back would navigate the page
 * underneath it and leave it floating over an unrelated screen.
 */
export function useAndroidBackButton() {
  useEffect(() => {
    if (!isNativeApp()) return;

    // Returns a promise, and the effect may be torn down before it settles, so the handle is
    // removed by chaining rather than by awaiting it here.
    const listener = App.addListener('backButton', ({ canGoBack }) => {
      // Anything open closes first, topmost outwards. Only once nothing is left does back mean
      // navigation.
      if (handleBack()) return;

      if (canGoBack) {
        window.history.back();

        return;
      }

      // Nothing to go back to. Leaving is what a person means by pressing back on the first screen,
      // and doing nothing is the behaviour this exists to fix.
      void App.exitApp();
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, []);
}
