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
    Record<string, React.RefObject<HTMLButtonElement>>
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
    if (isFirstRender.current) return;

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
  }, [activeCategory, activeCatAsState?.value, activeCat]);

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
