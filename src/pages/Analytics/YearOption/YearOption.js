import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledYearOption } from './YearOption.styled';
import { useTheme } from 'styled-components';
import { generateYearsArray } from '../helpers/generateYearsArray';
import { CategoryButton } from '../../../components/CategoryButton/CategoryButton';
export default function YearOption({ selectedYear, menu }) {
    const theme = useTheme();
    const allYears = generateYearsArray().reverse();
    return (_jsx(StyledYearOption, { children: allYears.map((year, index) => (_jsx(CategoryButton, { selected: year === selectedYear.value, onClick: () => {
                selectedYear.value = year;
                // selectedTimeCycleIndex.value = allYears.reverse().indexOf(year)
                menu.value = null;
            }, backgroundcoloronselect: theme?.clicked, children: _jsxs("div", { className: "wrapper", children: [_jsx("div", { className: "height" }, index), _jsx("span", { children: year }), _jsx("div", { className: "height" })] }) }, index))) }));
}
