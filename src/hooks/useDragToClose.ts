import { useCallback, useRef } from 'react';

// How far the finger moves before the gesture counts as a drag, or as something else.
const SLOP = 4;
// How far down a sheet has to be let go, as a part of its height, to close rather than spring back.
const CLOSE_PART = 0.3;
// A flick, in pixels a millisecond, closes it from any distance down, or keeps it open if upwards.
const FLICK_SPEED = 0.5;
// A flick is what the finger was doing as it let go, not a moment before it stopped.
const FLICK_WINDOW_MS = 100;
const SPRING_MS = 200;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

/** The element between the touch and the sheet that the touch would scroll up and down, if any. */
const scrollerOf = (target: EventTarget | null, sheet: HTMLElement) => {
  const stop = sheet.parentElement;

  for (
    let element = target instanceof Element ? target : null;
    element && element !== stop;
    element = element.parentElement
  ) {
    const { overflowY } = getComputedStyle(element);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      element.scrollHeight > element.clientHeight + 1
    ) {
      return element;
    }
  }

  return null;
};

type Drag = {
  startX: number;
  startY: number;
  scroller: Element | null;
  dragging: boolean;
  offset: number;
  lastY: number;
  lastTime: number;
  speed: number;
};

/**
 * Lets the finger pull a bottom sheet down, by its handle or anywhere on it that has nothing above
 * to scroll back to. Let go far enough down, or flicked down, it slides away and closes; otherwise
 * it springs back. Returns the ref to put on the sheet.
 */
export const useDragToClose = (onClose: () => void) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  return useCallback((sheet: HTMLElement | null) => {
    if (!sheet) return;

    let drag: Drag | null = null;
    let closing = false;
    let timer = 0;

    // Back where it was, and the inline styles gone again, so the sheet's own animations still run.
    const springBack = () => {
      sheet.style.transition = `transform ${SPRING_MS}ms ${EASE}`;
      sheet.style.transform = 'translateY(0)';
      timer = window.setTimeout(() => {
        sheet.style.transition = '';
        sheet.style.transform = '';
      }, SPRING_MS);
    };

    const close = ({ offset, speed }: Drag) => {
      closing = true;

      // At least as fast as the finger was moving, so a flick doesn't slow down as it lets go.
      const left = sheet.offsetHeight - offset;
      const ms = Math.min(220, Math.max(120, left / Math.max(speed, 1.5)));

      sheet.style.transition = `transform ${ms}ms ${EASE}`;
      // Past the bottom by a little more, so its shadow goes too.
      sheet.style.transform = 'translateY(calc(100% + 24px))';

      timer = window.setTimeout(() => {
        onCloseRef.current();

        // Whoever opened it kept it open after all: it comes back rather than stays out of sight.
        timer = window.setTimeout(() => {
          closing = false;
          if (sheet.isConnected) springBack();
        }, 500);
      }, ms);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (drag?.dragging) springBack();
      drag = null;
      if (closing || event.touches.length !== 1) return;

      const touch = event.touches[0];
      drag = {
        startX: touch.clientX,
        startY: touch.clientY,
        scroller: scrollerOf(event.target, sheet),
        dragging: false,
        offset: 0,
        lastY: touch.clientY,
        lastTime: event.timeStamp,
        speed: 0,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!drag) return;
      const touch = event.touches[0];

      if (!drag.dragging) {
        const dx = touch.clientX - drag.startX;
        const dy = touch.clientY - drag.startY;
        if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;

        // Sideways, upwards, or down a list scrolled away from its top, the touch is not a drag.
        if (dy <= Math.abs(dx) || (drag.scroller?.scrollTop ?? 0) > 0) {
          drag = null;
          return;
        }

        window.clearTimeout(timer);
        drag.dragging = true;
        sheet.style.transition = 'none';
      }

      // Nothing under the sheet scrolls, or pulls the page to refresh, while it follows the finger.
      if (event.cancelable) event.preventDefault();

      const elapsed = event.timeStamp - drag.lastTime;
      if (elapsed > 0) {
        drag.speed =
          0.6 * ((touch.clientY - drag.lastY) / elapsed) + 0.4 * drag.speed;
      }
      drag.lastY = touch.clientY;
      drag.lastTime = event.timeStamp;
      // From where the finger came down, so the sheet stays under it from the first move on.
      drag.offset = Math.max(0, touch.clientY - drag.startY);
      sheet.style.transform = `translateY(${drag.offset}px)`;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const ended = drag;
      drag = null;
      if (!ended?.dragging) return;

      const speed =
        event.timeStamp - ended.lastTime < FLICK_WINDOW_MS ? ended.speed : 0;

      if (speed < -FLICK_SPEED) {
        springBack();
      } else if (
        speed > FLICK_SPEED ||
        ended.offset > sheet.offsetHeight * CLOSE_PART
      ) {
        close({ ...ended, speed });
      } else {
        springBack();
      }
    };

    const handleTouchCancel = () => {
      if (drag?.dragging) springBack();
      drag = null;
    };

    sheet.addEventListener('touchstart', handleTouchStart, { passive: true });
    // Not passive: once the sheet follows the finger, the touch must not scroll anything as well.
    sheet.addEventListener('touchmove', handleTouchMove, { passive: false });
    sheet.addEventListener('touchend', handleTouchEnd);
    sheet.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      window.clearTimeout(timer);
      sheet.removeEventListener('touchstart', handleTouchStart);
      sheet.removeEventListener('touchmove', handleTouchMove);
      sheet.removeEventListener('touchend', handleTouchEnd);
      sheet.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);
};
