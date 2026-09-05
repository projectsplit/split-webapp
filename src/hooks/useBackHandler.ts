import { useEffect, useRef } from 'react';
import { pushBackHandler } from '@/helpers/backHandlers';

/**
 * Makes the Android back button close this thing while it is open.
 *
 * Registration is tied to `isActive` alone, never to `onBack`. An inline arrow function is a new
 * value on every render, so depending on it would unregister and re-register on each one — which
 * would quietly move an open menu to the top of the stack and have back close it before the submenu
 * sitting above it. The callback is read through a ref instead, so the stack entry stays put and
 * still runs the current version.
 *
 * Registers on the web too, where nothing reads the stack — it is only consulted from the Android
 * back listener. Left ungated so the two builds keep the same shape, and so Escape can be given the
 * same treatment later; today Escape is handled separately by the few components that want it.
 */
export function useBackHandler(isActive: boolean, onBack: () => void) {
  const latest = useRef(onBack);

  useEffect(() => {
    latest.current = onBack;
  });

  useEffect(() => {
    if (!isActive) return;

    return pushBackHandler(() => latest.current());
  }, [isActive]);
}
