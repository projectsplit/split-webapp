import { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { INSIGHT_MODULES } from './insights.data';
import { InsightCard } from './InsightCard';
import {
  CarouselSection,
  CarouselHeader,
  CarouselTitle,
  NavButtons,
  NavButton,
  Track,
} from './InsightsCarousel.styled';

const SCROLL_STEP = 420;

export const InsightsCarousel = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <CarouselSection>
      <CarouselHeader>
        <CarouselTitle>Stress Test Insights</CarouselTitle>
        <NavButtons>
          <NavButton
            aria-label="Previous insight"
            onClick={() => scrollBy(-SCROLL_STEP)}
          >
            <MdChevronLeft />
          </NavButton>
          <NavButton
            aria-label="Next insight"
            onClick={() => scrollBy(SCROLL_STEP)}
          >
            <MdChevronRight />
          </NavButton>
        </NavButtons>
      </CarouselHeader>

      <Track ref={trackRef}>
        {INSIGHT_MODULES.map((module) => (
          <InsightCard key={module.id} module={module} />
        ))}
      </Track>
    </CarouselSection>
  );
};
