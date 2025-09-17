import { StyledCarousel } from "./Carousel.styled";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { CarouselProps } from "../../../interfaces";
import { Frequency } from "../../../types";

export default function Carousel({
  carouselItems,
  selectedTimeCycleIndex,
  selectedCycle,
  cyclehaschanged,
  menu,
  selectedYear
}: CarouselProps) {

  const nextItem = () => {
    cyclehaschanged.value = false;
    selectedTimeCycleIndex.value =
      (selectedTimeCycleIndex.value + 1) % carouselItems.length;

    if (selectedCycle.value === Frequency.Annually)
      selectedYear.value = parseInt(carouselItems[selectedTimeCycleIndex.value] as string, 10)

  };

  const prevItem = () => {
    cyclehaschanged.value = false;
    selectedTimeCycleIndex.value =
      (selectedTimeCycleIndex.value - 1 + carouselItems.length) %
      carouselItems.length;

    if (selectedCycle.value === Frequency.Annually)
      selectedYear.value = parseInt(carouselItems[selectedTimeCycleIndex.value] as string, 10)
      
  };

  const displayCarouselItem = (cycle: Frequency, item: string[] | string[][]) => {
    switch (cycle) {
      case Frequency.Monthly:
        return item;
      case Frequency.Weekly:
        if (item.length === 1) return item[0];
        return item[0] + "- " + item[item.length - 1];
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
          style={{ transform: `translateX(${-selectedTimeCycleIndex.value * 100}%)` }}
        >
          {carouselItems.map((item: any, index: number) => (
            <div key={index} className="carousel-item" 
              onClick={() => (selectedCycle.value === Frequency.Annually ? 
              menu.value = "year" : menu.value = "timePeriod")}>
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
