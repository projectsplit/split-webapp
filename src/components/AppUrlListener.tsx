import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';
import { isNativeApp } from '@/helpers/platform';
import routes from '@/routes';

/**
 * Routes an invitation link that Android handed to the app instead of a browser.
 *
 * The manifest's App Link filter is what decides which URLs arrive here; this only turns the one it
 * lets through into an in-app navigation. Both arrival routes end up in the same place: a cold start
 * delivers the URL through this event once the web layer is up, and a link tapped while the app is
 * already running reuses the existing instance because the activity is `singleTask`.
 *
 * Renders nothing. It exists as a component rather than a hook call in App because it needs
 * `useNavigate`, which only works inside the Router.
 */

/** The one prefix the manifest registers. Anything else reaching this event is not ours to act on. */
const JOIN_PREFIX = '/j/';

export default function AppUrlListener() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNativeApp()) return;

    const listener = App.addListener('appUrlOpen', ({ url }) => {
      let path: string;

      try {
        const parsed = new URL(url);

        path = parsed.pathname + parsed.search;
      } catch {
        // Not a URL this code can read. Sign-in and other plugins raise this same event with
        // shapes of their own, so an unparseable one is ignored rather than reported.
        return;
      }

      // Checked even though the intent filter already narrows it. This event is shared with every
      // other plugin that handles a callback, and navigating on one of theirs would yank the app off
      // whatever screen it was on mid-flow.
      if (!path.startsWith(JOIN_PREFIX)) return;

      // A path within this app, never the absolute URL: routing to the origin would reload the
      // WebView out of the app shell. Anyone not signed in lands on the join route and is sent to
      // sign-in by Protected, which is where the code is picked up again afterwards.
      navigate(path);
    });

    return () => {
      void listener.then((handle) => handle.remove());
    };
  }, [navigate]);

  return null;
}

/** Kept honest against the route table: the filter and the router have to agree on the prefix. */
if (import.meta.env.DEV && !routes.JOIN.startsWith(JOIN_PREFIX)) {
  console.error(
    `Join route "${routes.JOIN}" no longer starts with "${JOIN_PREFIX}" — the Android App Link ` +
      'filter in AndroidManifest.xml needs updating to match.'
  );
}
