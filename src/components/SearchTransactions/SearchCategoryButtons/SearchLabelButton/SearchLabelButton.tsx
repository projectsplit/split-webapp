import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchLabelButtonProps } from "../../../../interfaces";
import LabelsPillsDisplay from "./LabelsPillsDisplay/LabelsPillsDisplay";

export default function SearchLabelButton({
  category,
  filteredLabels,
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter,
}: SearchLabelButtonProps) {
  return (
    <StyledSearchCategoryButton>
      <LabelsPillsDisplay
        category={category}
        filteredLabels={filteredLabels}
        showOptions={showOptions}
        submitButtonIsActive={submitButtonIsActive}
        filterState={filterState}
        cancelled={cancelled}
        removedFilter={removedFilter}
      />
    </StyledSearchCategoryButton>
  );
}
