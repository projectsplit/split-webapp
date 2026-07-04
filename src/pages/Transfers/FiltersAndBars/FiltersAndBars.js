import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledFiltersAndBars } from './FiltersAndBars.styled';
import { FiltersAndBarsSkeleton } from '@/components/FiltersAndBarsSkeleton/FiltersAndBarsSkeleton';
import { renderTransferFilterPills } from '@/helpers/renderTransferFilterPills';
import BarsWithLegends from '@/components/BarsWithLegends/BarsWithLegends';
import { Mode } from '@/types';
export const FiltersAndBars = ({ transferParsedFilters, allParticipants, group, queryClient, menu, currency, totalsAreFetching, userConvertedTotalReceived, userConvertedTotalSent, }) => {
    return (_jsx(StyledFiltersAndBars, { children: totalsAreFetching ? (_jsx(FiltersAndBarsSkeleton, { mode: Mode.Group })) : (_jsxs("div", { className: "filtersAndBars", children: [_jsxs("div", { className: "pills", onTouchStart: (e) => e.stopPropagation(), children: [' ', renderTransferFilterPills(transferParsedFilters, allParticipants, group, queryClient)] }), _jsx(BarsWithLegends, { bar1Legend: "Total Sent", bar2Legend: "Total Received", bar1Total: userConvertedTotalSent || 0, bar2Total: userConvertedTotalReceived || 0, currency: currency, bar1Color: "#0CA0A0", bar2Color: "#D79244", onClick: () => {
                        menu.value = 'epensesByCurrency';
                    } })] })) }));
};
