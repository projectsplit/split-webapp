import { signal } from '@preact/signals-react';

const STORAGE_KEY = 'welcomeTourSeen';

/**
 * Whether the tour is on screen, for what lives outside the signed-in screens and so cannot see the
 * menu it opens on: the web app's install prompt waits for it to close.
 */
export const welcomeTourOpen = signal(false);

/** The menu value Settings opens the tour with, so that closing it goes back to Settings. */
export const WELCOME_FROM_SETTINGS = 'welcome:settings';

// Remembered for this run of the app as well, so that a phone whose storage refuses the flag does
// not open the tour again the moment it is closed.
const shownThisRun = new Set<string>();

/** The people the welcome tour has opened for on this device, by user id. */
const seenBy = (): string[] => {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]'
    );
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const hasSeenWelcomeTour = (userId: string) =>
  shownThisRun.has(userId) || seenBy().includes(userId);

/**
 * Recorded as the tour opens rather than as it closes, so that it opens once: someone who leaves
 * the app mid-tour is not shown it again on every start. Settings opens it again on request.
 */
export const markWelcomeTourSeen = (userId: string) => {
  shownThisRun.add(userId);

  try {
    const seen = seenBy();
    if (!seen.includes(userId)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen, userId]));
    }
  } catch {
    // Without storage it opens again on the next start, which beats never opening.
  }
};
