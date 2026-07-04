import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledNoTransfersFound } from './NoTransfersFound.styled';
import { renderTransferFilterPills } from '@/helpers/renderTransferFilterPills';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiTransfer } from 'react-icons/bi';
export const NoTransfersFound = ({ transferParsedFilters, allParticipants, group, queryClient, }) => {
    const hasAnySearchParams = !!transferParsedFilters.value.before ||
        !!transferParsedFilters.value.after ||
        (transferParsedFilters.value.freeText !== '' &&
            transferParsedFilters.value.freeText !== undefined) ||
        (transferParsedFilters.value.sendersIds !== undefined &&
            transferParsedFilters.value.sendersIds.length > 0) ||
        (transferParsedFilters.value.receiversIds !== undefined &&
            transferParsedFilters.value.receiversIds.length > 0);
    return (_jsx(StyledNoTransfersFound, { children: hasAnySearchParams ? (_jsxs("div", { className: "noFilteredData", children: [_jsx("div", { className: "pills", children: renderTransferFilterPills(transferParsedFilters, allParticipants, group, queryClient) }), _jsxs("div", { className: "textAndIcon", children: [_jsx("span", { className: "text", children: "No transfers found. Have a go and refine your search!" }), _jsx("span", { className: "emoji", children: "\uD83E\uDDD0" }), _jsx(FaMagnifyingGlass, { className: "icon" })] }), _jsx("div", {})] })) : (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no transfers" }), _jsx(BiTransfer, { className: "icon" })] })) }));
};
