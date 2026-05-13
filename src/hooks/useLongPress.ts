import { useRef, useCallback, useEffect } from 'react';

const LONG_PRESS_DURATION = 500;

export function useLongPress(onLongPress: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const firedRef = useRef(false);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const start = useCallback(
    (e: React.TouchEvent) => {
      firedRef.current = false;
      startPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      timerRef.current = setTimeout(() => {
        firedRef.current = true;
        timerRef.current = null;
        onLongPress();
      }, LONG_PRESS_DURATION);
    },
    [onLongPress]
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const move = useCallback(
    (e: React.TouchEvent) => {
      if (!startPos.current) return;
      const dx = Math.abs(e.touches[0].clientX - startPos.current.x);
      const dy = Math.abs(e.touches[0].clientY - startPos.current.y);
      if (dx > 10 || dy > 10) cancel();
    },
    [cancel]
  );

  // Swallow the click that the browser synthesises after touchend
  // when a long press was detected
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (firedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      firedRef.current = false;
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchMove: move,
    onClickCapture: handleClick,
  };
}
