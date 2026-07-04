import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledFiltersAndBars } from './FiltersAndBars.styled';
import { FiltersAndBarsSkeleton } from '@/components/FiltersAndBarsSkeleton/FiltersAndBarsSkeleton';
import { renderExpenseFilterPills } from '@/helpers/renderExpenseFilterPills';
import BarsWithLegends from '@/components/BarsWithLegends/BarsWithLegends';
import { Mode, } from '@/types';
export const FiltersAndBars = ({ expenseParsedFilters, allParticipants, group, queryClient, mode, menu, totalsAreFetching, totalExpense, userExpense, currency, fetchedUserAndGroupLabels, }) => {
    return (_jsx(StyledFiltersAndBars, { children: totalsAreFetching ? (_jsx(FiltersAndBarsSkeleton, { mode: mode })) : (_jsxs("div", { className: "filtersAndBars", children: [_jsx("div", { className: "pills", onTouchStart: (e) => e.stopPropagation(), children: renderExpenseFilterPills(expenseParsedFilters, allParticipants, group, queryClient, mode, fetchedUserAndGroupLabels) }), _jsx(BarsWithLegends, { mode: mode, bar1Legend: mode === Mode.Group
                        ? 'Group Total'
                        : mode === Mode.NonGroup
                            ? 'Total'
                            : '', bar2Legend: 'Your Share', bar1Total: totalExpense || 0, bar2Total: userExpense || 0, currency: currency, bar2Color: "#e151ee", bar1Color: "#5183ee", onClick: () => {
                        menu.value = 'epensesByCurrency';
                    } })] })) }));
};
