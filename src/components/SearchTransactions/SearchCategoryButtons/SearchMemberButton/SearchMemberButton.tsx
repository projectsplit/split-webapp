import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchMemberButtonProps } from "../../../../interfaces";
import { MembersPillsDisplay } from "./MembersPillsDisplay/MembersPillsDisplay";


export default function SearchMemberButton({
  category,
  filteredMembers,
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter
}: SearchMemberButtonProps) {

  return (
    <StyledSearchCategoryButton>
      
        <MembersPillsDisplay
          category={category}
          filteredMembers={filteredMembers}
          showOptions={showOptions}
          submitButtonIsActive={submitButtonIsActive}
          filterState={filterState}
          cancelled={cancelled}
          removedFilter={removedFilter}/>
 
    </StyledSearchCategoryButton>
  );
}
