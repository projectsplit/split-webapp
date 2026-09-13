import { StyledCarousel } from './Carousel.styled';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import { CarouselProps } from '../../../interfaces';
import { Frequency } from '../../../types';
import { generateYearsArray } from '@/helpers/generateYearsArray';
import { generateAllWeeksPerYear } from '@/helpers/weeklyDataHelpers';

export default function Carousel({
  carouselItems,
  selectedTimeCycleIndex,
  selectedCycle,
  cyclehaschanged,
  menu,
  selectedYear,
}: CarouselProps) {
  const moveBy = (step: 1 | -1) => {
    cyclehaschanged.value = false;
    const nextIndex = selectedTimeCycleIndex.value + step;

    if (nextIndex >= 0 && nextIndex < carouselItems.length) {
      selectedTimeCycleIndex.value = nextIndex;
      if (selectedCycle.value === Frequency.Annually)
        selectedYear.value = parseInt(carouselItems[nextIndex] as string, 10);
      return;
    }

    if (selectedCycle.value === Frequency.Annually) return;

    const years = generateYearsArray();
    const nextYear = selectedYear.value + step;
    if (nextYear < years[0] || nextYear > years[years.length - 1]) return;

    const lastIndexOfNextYear =
      selectedCycle.value === Frequency.Weekly
        ? generateAllWeeksPerYear(nextYear).length - 1
        : carouselItems.length - 1;

    selectedYear.value = nextYear;
    selectedTimeCycleIndex.value = step === 1 ? 0 : lastIndexOfNextYear;
  };

  const nextItem = () => moveBy(1);

  const prevItem = () => moveBy(-1);

  const displayCarouselItem = (
    cycle: Frequency,
    item: string[] | string[][]
  ) => {
    switch (cycle) {
      case Frequency.Monthly:
        return item;
      case Frequency.Weekly:
        if (item.length === 1) return item[0];
        return item[0] + '- ' + item[item.length - 1];
      case Frequency.Annually:
        return item;
      default:
        return 0;
    }
  };

  return (
    <StyledCarousel $cyclehaschanged={cyclehaschanged}>
      <div className="carousel-container">
        <div className="arrow-btn left" onClick={prevItem}>
          <SlArrowLeft className="arrow" />
        </div>
        <div
          className="carousel"
          style={{
            transform: `translateX(${-selectedTimeCycleIndex.value * 100}%)`,
          }}
        >
          {carouselItems.map((item: any, index: number) => (
            <div
              key={index}
              className="carousel-item"
              onClick={() =>
                selectedCycle.value === Frequency.Annually
                  ? (menu.value = 'year')
                  : (menu.value = 'timePeriod')
              }
            >
              {displayCarouselItem(selectedCycle.value, item)}
            </div>
          ))}
        </div>
        <div className="arrow-btn right" onClick={nextItem}>
          <SlArrowRight className="arrow" />
        </div>
      </div>
    </StyledCarousel>
  );
}
