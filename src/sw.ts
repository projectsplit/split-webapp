/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope;

// Reproduces what the previous generateSW/autoUpdate setup did for us.
self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

const manifest = self.__WB_MANIFEST;

precacheAndRoute(manifest);

// Client-side routes have no precache entry of their own, so without this every deep link —
// including the URL a notification click opens — ends in "No route found". generateSW added this
// automatically; with injectManifest the worker is ours and has to declare it.
//
// Only a production build precaches index.html, and createHandlerBoundToURL throws immediately
// when its URL is missing rather than just failing to match — so the manifest decides whether to
// register at all. In dev the vite server serves SPA deep links itself and none of this is needed.
const hasPrecachedIndex = manifest.some((entry) =>
  (typeof entry === 'string' ? entry : entry.url).endsWith('index.html')
);

if (hasPrecachedIndex) {
  registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));
}

type PushPayload = {
  title?: string;
  body?: string;
  url?: string;
};

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload: PushPayload = {};

  try {
    payload = event.data.json();
  } catch {
    // A push that isn't our JSON shape still has to show something: browsers revoke the
    // permission if a userVisibleOnly subscription receives a push and shows no notification.
    payload = { body: event.data.text() };
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(payload.title ?? 'Buqs', {
        body: payload.body,
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        data: { url: payload.url ?? '/' },
      }),
      notifyOpenClients(),
    ])
  );
});

/**
 * Tells any open tab that something arrived, so the bell and the feed update without a reload.
 * The push already travelled to this device, so this costs no extra request.
 */
const notifyOpenClients = async () => {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (const client of clients) {
    client.postMessage({ type: 'notification-received' });
  }
};

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url: string = event.notification.data?.url ?? '/';

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(async (clients) => {
        // Reuse an open tab where possible so the click doesn't pile up windows.
        const client = clients.find((c) => 'focus' in c);

        if (client) {
          await client.focus();

          if ('navigate' in client) {
            await (client as WindowClient).navigate(url);
          }

          return;
        }

        await self.clients.openWindow(url);
      })
  );
});
