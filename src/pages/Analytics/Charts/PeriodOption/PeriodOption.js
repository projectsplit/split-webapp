import { jsx as _jsx } from "react/jsx-runtime";
import { StyledPeriodOption } from './StyledPeriodOption';
import { Frequency } from '../../../../types';
import { months } from '../../../../constants';
export default function PeriodOption({ selectedCycle, menu, selectedTimeCycleIndex, monthsAndDaysArrays, }) {
    const displayWeeks = (item) => {
        if (item.length === 1)
            return item[0];
        return item[0] + '- ' + item[item.length - 1];
    };
    return (_jsx(StyledPeriodOption, { children: selectedCycle.value === Frequency.Monthly
            ? months.map((month, index) => (_jsx("div", { onClick: () => {
                    selectedTimeCycleIndex.value = index;
                    menu.value = null;
                }, className: `item ${selectedTimeCycleIndex.value === index ? 'clicked' : ''}`, children: month }, index)))
            : monthsAndDaysArrays.map((week, index) => (_jsx("div", { onClick: () => {
                    selectedTimeCycleIndex.value = index;
                    menu.value = null;
                }, className: `item ${selectedTimeCycleIndex.value === index ? 'clicked' : ''}`, children: displayWeeks(week) }, index))) }));
}
