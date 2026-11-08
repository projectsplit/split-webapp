import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CategoryButton } from '../CategoryButton/CategoryButton';
import { CategorySelectorProps } from '../../interfaces';
import { StyledCategorySelector } from './CategorySelector.styled';
import { useCategorySwipe } from './useCategorySwipe';

export const CategorySelector = ({
  categories,
  activeCat,
  navLinkUse,
  activeCatAsState,
  variant,
  trackRef,
}: CategorySelectorProps) => {
  const isCompact = variant === 'segmentedCompact';
  const isSegmented = variant === 'segmented' || isCompact;

  const isFirstRender = useRef(true);
  const categoryKeys = Object.keys(categories);
  const getInitialActiveCategory = () => {
    const currentValue = navLinkUse
      ? activeCat.charAt(0).toUpperCase() + activeCat.slice(1)
      : activeCatAsState
        ? activeCatAsState.value.charAt(0).toUpperCase() +
          activeCatAsState.value.slice(1)
        : activeCat.charAt(0).toUpperCase() + activeCat.slice(1);
    const initialIndex = Object.values(categories).indexOf(currentValue);
    return initialIndex !== -1 ? categoryKeys[initialIndex] : categoryKeys[0];
  };

  const [activeCategory, setActiveCategory] = useState(
    getInitialActiveCategory
  );

  const { onTouchStart, onTouchEnd } = useCategorySwipe({
    categories,
    activeCat,
    navLinkUse,
    activeCatAsState,
  });

  useEffect(() => {
    const updatedCategory = getInitialActiveCategory();
    if (updatedCategory !== activeCategory) {
      setActiveCategory(updatedCategory);
    }
  }, [activeCatAsState?.value, activeCat]);

  const [indicatorPosition, setIndicatorPosition] = useState({
    left: '0px',
    width: '0px',
    transition: 'none',
  });

  const categoryRefStore = useRef<
    Record<string, React.RefObject<HTMLButtonElement | null>>
  >({});
  for (const key of categoryKeys) {
    if (!categoryRefStore.current[key]) {
      categoryRefStore.current[key] = { current: null };
    }
  }
  const categoryRefs = categoryRefStore.current;

  useLayoutEffect(() => {
    const activeButton = categoryRefs[activeCategory]?.current;

    if (activeButton) {
      const { offsetLeft, clientWidth } = activeButton;
      const reducedWidth = clientWidth;

      setIndicatorPosition({
        left: `${offsetLeft + clientWidth / 2}px`,
        width: `${reducedWidth}px`,
        transition: 'none',
      });
    }

    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    // Over a track of pages, the line goes where the track does, which the effect below sees to.
    if (isFirstRender.current || trackRef) return;

    const updateIndicator = () => {
      const activeButton = categoryRefs[activeCategory]?.current;

      if (activeButton) {
        const { offsetLeft, clientWidth } = activeButton;
        const reducedWidth = clientWidth;

        setIndicatorPosition({
          left: `${offsetLeft + clientWidth / 2}px`,
          width: `${reducedWidth}px`,
          transition: 'left 0.15s ease-in-out',
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeCategory, activeCatAsState?.value, activeCat, trackRef]);

  const indicatorRef = useRef<HTMLDivElement>(null);

  // A swipe across the pages moves the line with it, partway between the tabs it is passing.
  useEffect(() => {
    const track = trackRef?.current;
    if (!track) return;

    const keys = Object.keys(categories);
    const centre = (button: HTMLElement) =>
      button.offsetLeft + button.clientWidth / 2;

    const follow = () => {
      const indicator = indicatorRef.current;
      if (!indicator || track.clientWidth === 0) return;

      const progress = Math.min(
        Math.max(track.scrollLeft / track.clientWidth, 0),
        keys.length - 1
      );
      const from = categoryRefs[keys[Math.floor(progress)]]?.current;
      const to = categoryRefs[keys[Math.ceil(progress)]]?.current;
      if (!from || !to) return;

      const part = progress - Math.floor(progress);
      indicator.style.transition = 'none';
      indicator.style.left = `${centre(from) + (centre(to) - centre(from)) * part}px`;
      indicator.style.width = `${from.clientWidth + (to.clientWidth - from.clientWidth) * part}px`;
    };

    track.addEventListener('scroll', follow, { passive: true });
    window.addEventListener('resize', follow);
    return () => {
      track.removeEventListener('scroll', follow);
      window.removeEventListener('resize', follow);
    };
  }, [trackRef, categories, categoryRefs]);

  const isSmallScreen = window.matchMedia('(max-width: 360px)').matches;
  const getCategoryLabel = (label: string) => {
    if (label === 'Percentages') {
      return isSmallScreen ? '%' : 'Percent';
    }
    return label;
  };

  const categoryClickHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    for (const key of Object.keys(categories)) {
      handlers[key] = () => {
        setActiveCategory(key);
        if (!navLinkUse && activeCatAsState) {
          activeCatAsState.value =
            categories[key as keyof typeof categories]!;
        }
      };
    }
    return handlers;
  }, [categories, navLinkUse, activeCatAsState]);

  return (
    <StyledCategorySelector
      $segmented={isSegmented}
      $compact={isCompact}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="categories">
        {Object.entries(categories).map(([key, label]) => (
          <CategoryButton
            key={key}
            ref={categoryRefs[key]}
            to={
              navLinkUse
                ? categories[
                    key as keyof typeof categories
                  ]?.toLocaleLowerCase()
                : undefined
            }
            onClick={categoryClickHandlers[key]}
            selected={activeCategory === key}
            variant={
              isCompact ? 'segmentCompact' : isSegmented ? 'segment' : 'tab'
            }
          >
            {getCategoryLabel(label)}
          </CategoryButton>
        ))}
        <div
          ref={indicatorRef}
          className="selectedIndicator"
          style={{
            left: indicatorPosition.left,
            width: indicatorPosition.width,
            transform: 'translateX(-50%)',
            transition: indicatorPosition.transition,
          }}
        />
      </div>
    </StyledCategorySelector>
  );
};
