import { jsx as _jsx } from "react/jsx-runtime";
import { StyledSearchCategoryButton } from '../SearchCategoryButton.styled';
import LabelsPillsDisplay from './LabelsPillsDisplay/LabelsPillsDisplay';
export default function SearchLabelButton({ category, filteredLabels, showOptions, submitButtonIsActive, filterState, cancelled, removedFilter, isPersonal, }) {
    return (_jsx(StyledSearchCategoryButton, { children: _jsx(LabelsPillsDisplay, { category: category, filteredLabels: filteredLabels, showOptions: showOptions, submitButtonIsActive: submitButtonIsActive, filterState: filterState, cancelled: cancelled, removedFilter: removedFilter, isPersonal: isPersonal }) }));
}
