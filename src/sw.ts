/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

const manifest = self.__WB_MANIFEST;

precacheAndRoute(manifest);

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
