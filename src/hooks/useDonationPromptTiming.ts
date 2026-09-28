import { useEffect, useRef, useState } from 'react';

/**
 * Picks the moment. The server has already decided *whether* this person may be asked, across
 * months; this decides where inside a session the prompt is least in the way.
 *
 * Three conditions, all of which have to hold at once:
 *
 * - the tab is visible, so the prompt is not spent on a background tab nobody is looking at;
 * - the person has touched the page, which separates someone using the app from someone who left
 *   it open on a second monitor yesterday;
 * - they have been here a while, so a quick look-up-one-number visit is never interrupted.
 *
 * On top of that the caller passes `blocked` for anything in the way right now — an open menu, a
 * route that is mid-flow. Once all of it lines up the answer latches on and stays on: a menu
 * opening behind the prompt must not yank it off the screen while someone is reading it.
 */

const MIN_SESSION_DWELL_MS = 45_000;

/**
 * Module scope, so it survives every remount inside a session but resets on reload. One ask per
 * session no matter what the server allows — a second belt to go with the server's braces, and the
 * thing that stops a navigation loop from asking twice in a minute.
 */
let hasShownThisSession = false;

/**
 * Stands the prompt down for the rest of the session.
 *
 * Called when someone opens the donation form themselves. Popping an unprompted ask at a person who
 * has just gone looking for the thing on their own is the most avoidable way to be annoying, and no
 * server state can prevent it — this all happens inside one session.
 */
export function suppressDonationPromptForSession() {
  hasShownThisSession = true;
}

interface DonationPromptTimingOptions {
  /** The server cleared this person to be asked. */
  enabled: boolean;
  /** Something is in the way right now — a menu, an overlay, a route that is mid-flow. */
  blocked: boolean;
}

export function useDonationPromptTiming({
  enabled,
  blocked,
}: DonationPromptTimingOptions) {
  const [hasDwelled, setHasDwelled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(
    () => document.visibilityState === 'visible'
  );
  const [isOpen, setIsOpen] = useState(false);

  const hasLatched = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setHasDwelled(true),
      MIN_SESSION_DWELL_MS
    );

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const markInteracted = () => setHasInteracted(true);

    // once:true on each, so these unhook themselves after the first real input.
    window.addEventListener('pointerdown', markInteracted, { once: true });
    window.addEventListener('keydown', markInteracted, { once: true });

    return () => {
      window.removeEventListener('pointerdown', markInteracted);
      window.removeEventListener('keydown', markInteracted);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const handleVisibilityChange = () =>
      setIsVisible(document.visibilityState === 'visible');

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (hasLatched.current || hasShownThisSession) return;

    if (!enabled || blocked || !hasDwelled || !hasInteracted || !isVisible) {
      return;
    }

    hasLatched.current = true;
    hasShownThisSession = true;

    setIsOpen(true);
  }, [enabled, blocked, hasDwelled, hasInteracted, isVisible]);

  return {
    isOpen,
    close: () => setIsOpen(false),
  };
}
