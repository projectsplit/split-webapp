import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";

export default function SearchMemberButton({
  category,
  filteredMembers,
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
}: SearchMemberButtonProps) {
  return (
    <StyledSearchCategoryButton>
      <MembersPillsDisplay
        category={category}
        filteredMembers={filteredMembers}
        showOptions={showOptions}
        submitButtonIsActive={submitButtonIsActive}
        expenseFilterState={expenseFilterState}
        transferFilterState={transferFilterState}
        cancelled={cancelled}
        removedFilter={removedFilter}
      />
    </StyledSearchCategoryButton>
  );
}
