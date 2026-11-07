import { useRef } from 'react';
import {
  NavigationType,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

type Jump = { key: string; token: string; request: string };

/**
 * The jump a jump link (?jumpTo=) asks for, as a value that changes once per jump, or null off a
 * jump link.
 *
 * Every navigation to a jump link is a jump, even to the link the screen is already on, as when the
 * same notification is tapped again from inside the list: each navigation has its own location key.
 * Overlays push history entries of their own that keep the key, so opening and closing one is not a
 * jump. Nor is going back or forward to the item jumped to last, so the back button stays quiet
 * through the entries that repeated taps leave behind.
 */
export const useJumpRequest = (jumpToken: string | null | undefined) => {
  const { key } = useLocation();
  const navigationType = useNavigationType();
  const last = useRef<Jump | null>(null);

  if (!jumpToken) return null;

  // Worked out during render, the same way for every render of one navigation.
  const previous = last.current;
  if (previous?.key === key) return previous.request;

  const request =
    previous &&
    navigationType === NavigationType.Pop &&
    previous.token === jumpToken
      ? previous.request
      : `${key} ${jumpToken}`;
  last.current = { key, token: jumpToken, request };
  return request;
};
