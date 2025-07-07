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
    filterState.value.freeText = "";
    submitButtonIsActive.value = true;
    removedFilter.value = true;
  };

  return (
    <StyledCurrentSearchField>
      <div className="category">search term:</div>
      &nbsp;
      <div className="pills">
        <Pill
          title={currentSearch}
          color="#ffffff"
          closeButton={true}
          onClose={() => removeFilter()}
          $textColor="#000000c8"
          $border={false}
          fontSize="16px"
        />
      </div>
    </StyledCurrentSearchField>
  );
}
