import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledCarousel } from './Carousel.styled';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import { Frequency } from '../../../types';
export default function Carousel({ carouselItems, selectedTimeCycleIndex, selectedCycle, cyclehaschanged, menu, selectedYear, }) {
    const nextItem = () => {
        cyclehaschanged.value = false;
        selectedTimeCycleIndex.value =
            (selectedTimeCycleIndex.value + 1) % carouselItems.length;
        if (selectedCycle.value === Frequency.Annually)
            selectedYear.value = parseInt(carouselItems[selectedTimeCycleIndex.value], 10);
    };
    const prevItem = () => {
        cyclehaschanged.value = false;
        selectedTimeCycleIndex.value =
            (selectedTimeCycleIndex.value - 1 + carouselItems.length) %
                carouselItems.length;
        if (selectedCycle.value === Frequency.Annually)
            selectedYear.value = parseInt(carouselItems[selectedTimeCycleIndex.value], 10);
    };
    const displayCarouselItem = (cycle, item) => {
        switch (cycle) {
            case Frequency.Monthly:
                return item;
            case Frequency.Weekly:
                if (item.length === 1)
                    return item[0];
                return item[0] + '- ' + item[item.length - 1];
            case Frequency.Annually:
                return item;
            default:
                return 0;
        }
    };
    return (_jsx(StyledCarousel, { "$cyclehaschanged": cyclehaschanged, children: _jsxs("div", { className: "carousel-container", children: [_jsx("div", { className: "arrow-btn left", onClick: prevItem, children: _jsx(SlArrowLeft, { className: "arrow" }) }), _jsx("div", { className: "carousel", style: {
                        transform: `translateX(${-selectedTimeCycleIndex.value * 100}%)`,
                    }, children: carouselItems.map((item, index) => (_jsx("div", { className: "carousel-item", onClick: () => selectedCycle.value === Frequency.Annually
                            ? (menu.value = 'year')
                            : (menu.value = 'timePeriod'), children: displayCarouselItem(selectedCycle.value, item) }, index))) }), _jsx("div", { className: "arrow-btn right", onClick: nextItem, children: _jsx(SlArrowRight, { className: "arrow" }) })] }) }));
}
