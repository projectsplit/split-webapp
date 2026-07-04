import { jsx as _jsx } from "react/jsx-runtime";
import { StyledSearchCategoryButton } from '../SearchCategoryButton.styled';
import { PeoplePillsDisplay } from './MembersPillsDisplay/PeoplePillsDisplay';
export default function SearchPersonButton({ category, type, filteredPeople, showOptions, submitButtonIsActive, expenseFilterState, transferFilterState, cancelled, removedFilter, }) {
    return (_jsx(StyledSearchCategoryButton, { children: _jsx(PeoplePillsDisplay, { category: category, type: type, filteredPeople: filteredPeople, showOptions: showOptions, submitButtonIsActive: submitButtonIsActive, expenseFilterState: expenseFilterState, transferFilterState: transferFilterState, cancelled: cancelled, removedFilter: removedFilter }) }));
}
