import { StyledSearchFilterRow } from '../../SearchFilterRow.styled';
import { SearchLabelButtonProps } from '../../../../interfaces';
import LabelsPillsDisplay from './LabelsPillsDisplay/LabelsPillsDisplay';

export default function SearchLabelButton({
  category,
  filteredLabels,
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter,
  isPersonal,
}: SearchLabelButtonProps) {
  return (
    <StyledSearchFilterRow>
      <LabelsPillsDisplay
        category={category}
        filteredLabels={filteredLabels}
        showOptions={showOptions}
        submitButtonIsActive={submitButtonIsActive}
        filterState={filterState}
        cancelled={cancelled}
        removedFilter={removedFilter}
        isPersonal={isPersonal}
      />
    </StyledSearchFilterRow>
  );
}
