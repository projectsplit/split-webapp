import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledCycleOption } from './CycleOption.styled';
import { Frequency } from '../../../types';
export default function CycleOption({ selectedCycle, menu, cyclehaschanged, }) {
    return (_jsxs(StyledCycleOption, { children: [_jsx("div", { onClick: () => {
                    selectedCycle.value === Frequency.Weekly ||
                        selectedCycle.value === Frequency.Monthly
                        ? (cyclehaschanged.value = true)
                        : (cyclehaschanged.value = false);
                    selectedCycle.value = Frequency.Annually;
                    menu.value = null;
                }, className: `item ${selectedCycle.value === Frequency.Annually ? 'clicked' : ''}`, children: "Annually" }), _jsx("div", { onClick: () => {
                    selectedCycle.value === Frequency.Weekly ||
                        selectedCycle.value === Frequency.Annually
                        ? (cyclehaschanged.value = true)
                        : (cyclehaschanged.value = false);
                    selectedCycle.value = Frequency.Monthly;
                    menu.value = null;
                }, className: `item ${selectedCycle.value === Frequency.Monthly ? 'clicked' : ''}`, children: "Monthly" }), _jsx("div", { onClick: () => {
                    selectedCycle.value === Frequency.Monthly ||
                        selectedCycle.value === Frequency.Annually
                        ? (cyclehaschanged.value = true)
                        : (cyclehaschanged.value = false);
                    selectedCycle.value = Frequency.Weekly;
                    menu.value = null;
                }, className: `item ${selectedCycle.value === Frequency.Weekly ? 'clicked' : ''}`, children: "Weekly" })] }));
}
