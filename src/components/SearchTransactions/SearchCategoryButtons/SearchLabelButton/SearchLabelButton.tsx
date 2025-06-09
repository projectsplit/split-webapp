import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchLabelButtonProps } from "../../../../interfaces";

export default function SearchLabelButton({
  category,
  type,
  
}: SearchLabelButtonProps) {

  return (
    <StyledSearchCategoryButton  >
      <div className="category">{category}:</div>&nbsp;
      <div className="type">{type}</div>
    </StyledSearchCategoryButton>
  );
}
