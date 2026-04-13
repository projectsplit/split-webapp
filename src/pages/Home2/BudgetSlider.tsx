import { useRef, useState, useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { BudgetInfoResponse } from '@/types';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { PersonalCapCard } from './PersonalCapCard';
import {
  SliderViewport,
  SliderTrack,
  Slide,
  DotsRow,
  Dot,
  SideBySideGrid,
} from './BudgetSlider.styled';

interface BudgetSliderProps {
  activeBudgetData: BudgetInfoResponse;
  onCapClick: () => void;
}

const GAP = 12;
const PEEK = 16;
const SIDE_BY_SIDE_MIN_WIDTH = 500;

export const BudgetSlider = ({
  activeBudgetData,
  onCapClick,
}: BudgetSliderProps) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const isWide = containerWidth >= SIDE_BY_SIDE_MIN_WIDTH;

  const getSlideWidth = useCallback(() => {
    if (!containerWidth) return 300;
    return containerWidth - PEEK;
  }, [containerWidth]);

  const getBaseOffset = useCallback(
    (index: number) => {
      const slideWidth = getSlideWidth();
      return -(index * (slideWidth + GAP));
    },
    [getSlideWidth]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const slideWidth = getSlideWidth();
    const elapsed = Date.now() - touchStartTime.current;
    const velocity = Math.abs(dragOffset) / elapsed;
    const threshold = velocity > 0.5 ? slideWidth * 0.15 : slideWidth * 0.3;

    let newIndex = currentIndex;
    if (dragOffset < -threshold && currentIndex < 1) {
      newIndex = 1;
    } else if (dragOffset > threshold && currentIndex > 0) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartTime.current = Date.now();
    setIsDragging(true);

    const handleMouseMove = (ev: MouseEvent) => {
      const delta = ev.clientX - touchStartX.current;
      setDragOffset(delta);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const slideWidth = getSlideWidth();
      const elapsed = Date.now() - touchStartTime.current;
      const velocity = Math.abs(dragOffset) / elapsed;
      const threshold = velocity > 0.5 ? slideWidth * 0.15 : slideWidth * 0.3;

      setCurrentIndex((prev) => {
        if (dragOffset < -threshold && prev < 1) return 1;
        if (dragOffset > threshold && prev > 0) return 0;
        return prev;
      });
      setDragOffset(0);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const budgetMessageStyle: React.CSSProperties = {
    backgroundColor: '#1b1b1b',
    border: '1px solid rgba(77, 67, 84, 0.1)',
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: 'none',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '0.8125rem',
    color: theme.subtleText,
  };

  const budgetInfoEl = (
    <div onClick={onCapClick} style={{ cursor: 'pointer', height: '100%' }}>
      {BudgetInfoMessage(
        theme,
        false,
        activeBudgetData,
        undefined,
        undefined,
        budgetMessageStyle
      )}
    </div>
  );

  // Wide: show both side by side, no carousel
  if (isWide) {
    return (
      <div ref={containerRef}>
        <SideBySideGrid>
          <PersonalCapCard
            activeBudgetData={activeBudgetData}
            onClick={onCapClick}
          />
          {budgetInfoEl}
        </SideBySideGrid>
      </div>
    );
  }

  // Narrow: carousel with peek + drag
  const baseOffset = getBaseOffset(currentIndex);
  const totalOffset = baseOffset + dragOffset;
  const slideWidth = getSlideWidth();

  return (
    <div ref={containerRef}>
      <SliderViewport
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <SliderTrack $offset={totalOffset} $animate={!isDragging}>
          <Slide $width={slideWidth}>
            <PersonalCapCard
              activeBudgetData={activeBudgetData}
              onClick={onCapClick}
            />
          </Slide>
          <Slide $width={slideWidth}>{budgetInfoEl}</Slide>
        </SliderTrack>
      </SliderViewport>
      <DotsRow>
        <Dot $active={currentIndex === 0} />
        <Dot $active={currentIndex === 1} />
      </DotsRow>
    </div>
  );
};
