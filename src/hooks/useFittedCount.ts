import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

function fittingCount(
  available: number,
  widths: number[],
  gap: number,
  reserve: number
): number {
  let used = 0;

  for (let i = 0; i < widths.length; i++) {
    const next = used + (i > 0 ? gap : 0) + widths[i];

    if (next <= available + 0.5) {
      used = next;
      continue;
    }

    let count = i;
    while (count > 0 && used + gap + reserve > available + 0.5) {
      used -= widths[count - 1] + (count > 1 ? gap : 0);
      count--;
    }
    return count;
  }

  return widths.length;
}

export function useFittedCount(
  rowRef: RefObject<HTMLElement | null>,
  itemsKey: string,
  total: number,
  reserve: number
): number {
  const widthsRef = useRef<number[]>([]);
  const [visible, setVisible] = useState(total);
  const [measuredKey, setMeasuredKey] = useState(itemsKey);

  if (measuredKey !== itemsKey) {
    setMeasuredKey(itemsKey);
    widthsRef.current = [];
    setVisible(total);
  }

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    if (widthsRef.current.length !== total) {
      if (row.childElementCount !== total) return;
      widthsRef.current = Array.from(row.children).map(
        (child) => child.getBoundingClientRect().width
      );
    }

    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const count = fittingCount(
      row.clientWidth,
      widthsRef.current,
      gap,
      reserve
    );

    setVisible((current) => (current === count ? current : count));
  }, [rowRef, total, reserve]);

  useLayoutEffect(() => {
    measure();
  });

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(row);
    return () => observer.disconnect();
  }, [rowRef, measure]);

  return visible;
}
