import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { renderExpenseFilterPills } from '@/helpers/renderExpenseFilterPills';
import { StyledNoExpensesFound } from './NoExpensesFound.styled';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { CiReceipt } from 'react-icons/ci';
export const NoExpensesFound = ({ expenseParsedFilters, allParticipants, group, queryClient, mode, fetchedUserAndGroupLabels, }) => {
    const hasAnySearchParams = !!expenseParsedFilters.value.before ||
        !!expenseParsedFilters.value.after ||
        (expenseParsedFilters.value.freeText !== '' &&
            expenseParsedFilters.value.freeText !== undefined) ||
        (expenseParsedFilters.value.labels !== undefined &&
            expenseParsedFilters.value.labels.length > 0) ||
        (expenseParsedFilters.value.participantsIds !== undefined &&
            expenseParsedFilters.value.participantsIds.length > 0) ||
        (expenseParsedFilters.value.payersIds !== undefined &&
            expenseParsedFilters.value.payersIds.length > 0);
    return (_jsx(StyledNoExpensesFound, { children: hasAnySearchParams ? (_jsxs("div", { className: "noFilteredData", children: [_jsx("div", { className: "pills", children: renderExpenseFilterPills(expenseParsedFilters, allParticipants, group, queryClient, mode, fetchedUserAndGroupLabels) }), _jsxs("div", { className: "textAndIcon", children: [_jsx("span", { className: "text", children: "No expenses found. Have a go and refine your search!" }), _jsx("span", { className: "emoji", children: "\uD83E\uDDD0" }), _jsx(FaMagnifyingGlass, { className: "icon" })] }), _jsx("div", {})] })) : (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no expenses" }), _jsx(CiReceipt, { className: "icon" })] })) }));
};
