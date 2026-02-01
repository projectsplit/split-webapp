import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchPeopleButtonProps } from "../../../../interfaces";
import { PeoplePillsDisplay } from "./MembersPillsDisplay/PeoplePillsDisplay";

export default function SearchPersonButton({
  category,
  type,
  filteredPeople,
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
}: SearchPeopleButtonProps) {
  return (
    <StyledSearchCategoryButton>
      <PeoplePillsDisplay
        category={category}
        type={type}
        filteredPeople={filteredPeople}
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
