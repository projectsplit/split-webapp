import { onlineManager } from '@tanstack/react-query';
import { signal } from '@preact/signals-react';
import axios from 'axios';

// TanStack Query assumes it is online until the browser reports a change, and the browser only
// reports changes. An app opened with no connection would otherwise fire every request and wait
// for each one to fail, instead of showing what it already has. The Android WebView keeps
// navigator.onLine current because the app holds ACCESS_NETWORK_STATE.
onlineManager.setOnline(navigator.onLine);

/** Whether the device has a connection, kept in step with TanStack Query's view of it. */
export const isOnline = signal(onlineManager.isOnline());

onlineManager.subscribe((online) => {
  isOnline.value = online;
});

/**
 * For the actions that cannot wait on the phone for a connection the way a new expense can. Told
 * up front, because the request would otherwise sit paused behind a spinner until one came back.
 */
export const needsConnectionMessage = (action: string) =>
  `You're offline. ${action} needs a connection, so try again once you're back online.`;

/**
 * True when a request got no verdict from the server: no connection, a timeout, or a gateway or
 * rate limit saying the server is out of reach for now. None of that is about the request itself,
 * so sending it again later is the right response; any other failure is the server's answer.
 */
export const isConnectivityError = (error: unknown): boolean => {
  // A cancelled request is an AxiosError with no response too, but it is how the session's end is
  // signalled, not a sign of being offline.
  if (axios.isCancel(error)) return false;
  if (!axios.isAxiosError(error)) return false;

  const status = error.response?.status;

  return (
    status === undefined ||
    status === 408 ||
    status === 429 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
};
