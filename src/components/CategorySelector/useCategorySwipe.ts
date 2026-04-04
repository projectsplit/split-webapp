import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Signal } from '@preact/signals-react';

interface UseCategorySwipeParams {
  categories: Record<string, string | undefined>;
  activeCat: string;
  navLinkUse: boolean;
  activeCatAsState?: Signal<string>;
}

export const useCategorySwipe = ({
  categories,
  activeCat,
  navLinkUse,
  activeCatAsState,
}: UseCategorySwipeParams) => {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const categoryKeys = Object.keys(categories);

  const getCurrentKey = () => {
    const currentValue = navLinkUse
      ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
      : activeCatAsState
        ? activeCatAsState.value.charAt(0).toUpperCase() +
          activeCatAsState.value.slice(1)
        : activeCat.charAt(0).toUpperCase() + activeCat.slice(1);
    const idx = Object.values(categories).indexOf(currentValue);
    return idx !== -1 ? categoryKeys[idx] : categoryKeys[0];
  };

  const selectCategory = (key: string) => {
    if (navLinkUse) {
      const to = categories[key]?.toLocaleLowerCase();
      if (to) navigate(to, { replace: true });
    } else if (activeCatAsState) {
      activeCatAsState.value = categories[key]!;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const distanceX = touchStartX.current - e.changedTouches[0].clientX;
    const distanceY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore mostly-vertical swipes so we don't interfere with page scrolling
    if (Math.abs(distanceX) < Math.abs(distanceY)) return;
    if (Math.abs(distanceX) < 50) return;

    const currentIndex = categoryKeys.indexOf(getCurrentKey());
    if (currentIndex === -1) return;

    if (distanceX > 0 && currentIndex < categoryKeys.length - 1) {
      // Swipe left -> next category
      selectCategory(categoryKeys[currentIndex + 1]);
    } else if (distanceX < 0 && currentIndex > 0) {
      // Swipe right -> previous category
      selectCategory(categoryKeys[currentIndex - 1]);
    }
  };

  return { onTouchStart, onTouchEnd };
};
