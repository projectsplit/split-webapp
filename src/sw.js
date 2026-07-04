/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
// Behave like the previous generateSW autoUpdate setup
self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
self.addEventListener('push', (event) => {
    if (!event.data)
        return;
    let payload = {};
    try {
        payload = event.data.json();
    }
    catch {
        payload = { body: event.data.text() };
    }
    event.waitUntil(self.registration.showNotification(payload.title ?? 'Buqs', {
        body: payload.body,
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        data: { url: payload.url ?? '/' },
    }));
});
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url ?? '/';
    event.waitUntil(self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then(async (clients) => {
        const client = clients.find((c) => 'focus' in c);
        if (client) {
            await client.focus();
            if ('navigate' in client) {
                await client.navigate(url);
            }
            return;
        }
        await self.clients.openWindow(url);
    }));
});
