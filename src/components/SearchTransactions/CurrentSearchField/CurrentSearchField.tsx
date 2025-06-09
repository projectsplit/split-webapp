import { StyledCurrentSearchField } from "./StyledCurrentSearchField";
import Pill from "../../Pill/Pill";
import { CurrentSearchFieldProps } from "../../../interfaces";


export default function CurrentSearchField({
  currentSearch,
  filterState,
  submitButtonIsActive,
  removedFilter,
}: CurrentSearchFieldProps) {
  
  const removeFilter = () => {
    filterState.value.description = "";
    submitButtonIsActive.value = true;
    removedFilter.value = true;
  };

  return (
    <StyledCurrentSearchField>
      <div className="category">current search:</div>
      &nbsp;
      <div className="pills">
        <Pill
          title={currentSearch}
          color="#A7A7A7"
          closeButton={true}
          onClose={() => removeFilter()}
          $textColor="#000000c8"
        />
      </div>
    </StyledCurrentSearchField>
  );
}
